const Article = require("../models/article");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const BadRequestError = require("../errors/bad-request-error");

const getUserArticles = (req, res, next) => {
  const id = req.user._id;
  Article.find({ owner: id })
    .then((articles) => res.status(200).send(articles))
    .catch(next);
};

const saveArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(200).send(article))
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(
          new BadRequestError(
            `${Object.values(err.errors)
              .map((error) => error.message)
              .join(", ")}`
          )
        );
      } else {
        next(err);
      }
    });
};

const deleteArticle = (req, res, next) => {
  Article.findById(req.params.articleId)
    .orFail(() => new NotFoundError("Article ID not found"))
    .then((article) => {
      if (!article.owner.equals(req.user._id)) {
        next(new ForbiddenError("You cannot delete someone else's article")); // cannot delete the article if you are not the owner
      } else {
        Article.deleteOne(article).then(() =>
          res.status(200).send({ data: article })
        );
      }
    })
    .catch(next);
};

module.exports = {
  getUserArticles,
  saveArticle,
  deleteArticle,
};
