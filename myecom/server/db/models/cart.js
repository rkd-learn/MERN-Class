const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  products: [{
    type: mongoose.Types.ObjectId,
    ref: "Product",
  }],

  Qty: Number,

  status: String
});

module.exports = mongoose.model("cart", CartSchema);
