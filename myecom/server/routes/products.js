const express = require("express");
const router = express.Router();

// Importing product model
const Product = require("../db/models/product");


// Create new product
router.post("/", async (req, res) => {
  // Business logic
  const data = req.body;

  const newProduct = new Product({
    price: data.price,
    name: data.name,
    brand: data.brand,
    size: data.size
  });

  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});



// get list of products
router.get("/", async (req, res) => {
  const products = await Product.find();

  res.send(products);
});


// Update porduct
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await Product.findById(id);

    const newData = req.body;

    if (newData.price) {
      oldData.price = newData.price;
    }

    if (newData.name) {
      oldData.name = newData.name;
    }

    if (newData.brand) {
      oldData.brand = newData.brand
    }

    if (newData.size) {
      oldData.size = newData.size;
    }

    const updatedData = await oldData.save();

    res.send(updatedData);
  } catch (er) {
    console.log(er);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Product.findByIdAndDelete(id);

  res.send(`Product with id ${id} deleted`);
});
module.exports = router;
