const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  OrderID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },

  Price: Number,

  paymentMethod: String,

  status: String
});

module.exports = mongoose.model("Payment", PaymentSchema);
