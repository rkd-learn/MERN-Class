const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  productID: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },

  Qty: Number,

  status: String
});

module.exports  = mongoose.model("Order",OrderSchema)