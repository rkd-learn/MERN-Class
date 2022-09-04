const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  cartId: {
    type: mongoose.Types.ObjectId,
    ref: "Cart",
  },

  paymentStatus: String,
  deliveryStatus: String
});

module.exports = mongoose.model("Order", OrderSchema)
