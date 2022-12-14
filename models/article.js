const mongoose = require("mongoose");
const validator = require("validator");

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: [true, "url required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "This field must be a link.",
    },
  },
  image: {
    type: String,
    required: [true, "url required"],
    validate: {
      validator: (v) => validator.isURL(v),
      message: "This field must be a link.",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

// set the default behavior so that the database doesn't return owner field
articleSchema.methods.toJSON = function () {
  const { owner, ...obj } = this.toObject();
  return obj;
};

module.exports = mongoose.model("article", articleSchema);
