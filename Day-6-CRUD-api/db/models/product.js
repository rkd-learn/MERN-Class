const mongoose =require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number
})

const productModel = mongoose.model("product",ProductSchema)

module.exports = productModel

