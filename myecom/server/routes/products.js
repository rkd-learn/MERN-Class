const express = require("express");
const router = express.Router();

const { upload } = require("../utils/multer")

// Importing product model
const Product = require("../db/models/product");

// Create new product
router.post("/", upload.single("productImage"), async (req, res) => {
  // Business logic

  try {

    const data = req.body;

    const newProduct = new Product({
      price: data.price,
      name: data.name,
      brand: data.brand,
      size: data.size,
      image: req.file && req.file?.path
    });

    const savedProduct = await newProduct.save();

    res.send(savedProduct);
  } catch (error) {
    console.log("ERR", error)
    res.json({
      error: error.message
    })
  }
});



// get list of products
router.get("/", async (req, res) => {
  const products = await Product.find();

  res.send(products);
});


// get list of products
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const product = await Product.findById(id);

  res.send(product);
});

// Update porduct
router.put("/:id", upload.single("productImage"), async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await Product.findById(id);

    const newData = req.body;


    if(req.file && req.file?.path){
      oldData.image=req.file?.path
    }

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
