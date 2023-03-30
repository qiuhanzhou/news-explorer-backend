// containing a middleware function for checking JWT

const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../errors/unauthorized-error");
const { JWT_DEVELOPMENT } = require("../utils/constants");

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authorization Required");
  }

  // get token from header
  const token = authorization.replace("Bearer ", "");

  const jwtSecret = NODE_ENV === "production" ? JWT_SECRET : JWT_DEVELOPMENT;

  let payload;

  try {
    payload = jwt.verify(token, jwtSecret);
    // jwt.verity() returns the decoded payload of the token
  } catch (e) {
    next(new UnauthorizedError("You are not authorized"));
  }
  req.user = payload; // assigning the payload to the request object
  next(); // sending the request to the next middleware
};

module.exports = auth;
