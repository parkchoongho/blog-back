const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  admin: Boolean
});

const User = model("User", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  });
  return schema.validateUser(user);
}

module.exports = { User, validateUser };