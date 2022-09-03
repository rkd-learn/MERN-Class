const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CartItemSchema = new Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  Qty: Number,
});

module.exports = mongoose.model("cartItems", CartItemSchema);
