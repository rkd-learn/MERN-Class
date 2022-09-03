const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: Number,
  brand: {
    type: String,
    required: true,
  },
  size: String,

  image: {
    type: String,
    required: true
  }
});

const productModel = mongoose.model("Product", ProductSchema);

module.exports = productModel;
