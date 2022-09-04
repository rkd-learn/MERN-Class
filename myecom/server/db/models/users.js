const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
  },

  address: [String],
  shippingAddress: [String],

  password: String
});

module.exports = mongoose.model("Users", UserSchema);
