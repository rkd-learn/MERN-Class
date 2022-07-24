const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Importing product model
const Product = require("../db/models/product")

// get list of products
router.get("/",async (req,res)=>{

    const products = await Product.find();

    res.send(products)

})


router.put("/:id",async (req,res)=>{

    try{
  
    const id = req.params.id

    const oldData =await Product.findById(id)

    oldData.price = req.body.price;

     const updatedData = await oldData.save()

     res.send(updatedData)

}catch(er){
    console.log(er)
}

})

router.delete("/:id",async(req,res)=>{

    const id = req.params.id;

    await Product.findByIdAndDelete(id)

    res.send(`Product with id ${id} deleted`)

})

router.post("/",async (req,res)=>{
  // Business logic

  const data = req.body;
  console.log("Posted DATA", data);

  const newProduct = new Product({
      price:data.price,
      name:data.name
  })

  const savedProduct = await newProduct.save()

  res.send(savedProduct);
})

module.exports = router;