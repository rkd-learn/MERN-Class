const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  items: [{
    type: mongoose.Types.ObjectId,
    ref: "cartItems",
  }],

  status: String
});

module.exports = mongoose.model("cart", CartSchema);
