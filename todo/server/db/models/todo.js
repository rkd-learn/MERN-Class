const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  todo: {
    type: String,
    required: true,
  },

  isDone: {
    type: Boolean,
  },
});

module.exports = mongoose.model("todo", UserSchema);
