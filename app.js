require("dotenv").config();

const { PORT = 3001, NODE_ENV, MONGO_URL } = process.env;
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const { errors } = require("celebrate");
const cors = require("cors");
const routes = require("./routes");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const { limiter, FRONTEND_URL } = require("./utils/constants");
const centralizedError = require("./middlewares/centralizedError");

const app = express();

mongoose.connect(
  NODE_ENV === "production" ? MONGO_URL : "mongodb://localhost:27017/newsdb",
  {
    useNewUrlParser: true,
  }
);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

// enable cross domain visits from allowed origins
app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    NODE_ENV === "production" ? FRONTEND_URL : "http://localhost:3000/"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});

// include these before other routes
app.use(cors());
app.options("*", cors()); // enable requests for all routes

app.use(routes);

// REMEMBER: REMOVE AFTER PASS REVIEW
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(requestLogger); // enabling the request logger

app.use(errorLogger); // enabling the error logger

app.use(errors()); // celebrate error handler

// app.use(centralizedError); // centralized error handler

// centralized error handler
app.use(centralizedError);

// to serve static files that are in the public directory - ie. http://localhost:3000/kitten.jpg
// app.use(express.static(path.join(__dirname, 'public')))

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
