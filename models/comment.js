const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { Schema, model } = mongoose;

const commentSchema = new Schema({
  post_id: { type: mongoose.Types.ObjectId, ref: "Post" },
  author: { type: mongoose.Types.ObjectId, ref: "User" },
  contents: String,
  date: { type: Date, default: Date.now }
});

const Comment = model("Comment", commentSchema);

function validateComment(comment) {
  const schema = Joi.object({
    post_id: Joi.string(),
    author: Joi.string(),
    contents: Joi.string(),
    date: Joi.date()
  });
  return schema.validateComment(comment);
}

module.exports = { Comment, validateComment };
