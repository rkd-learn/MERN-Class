const express = require("express");
const router = express.Router();

// Importing product model
const Cart = require("../db/models/cart");

// get list of cats
router.get("/", async (req, res) => {

  const carts = await Cart.find();

  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const cartData = await Cart.findById(id)
    .populate("productID")
    .populate("userID");

  res.send(cartData)

})

// Update Carts
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await Cart.findById(id);

    const newData = req.body;

    if (newData.Qty) {
      oldData.Qty = newData.Qty;
    }

    if (newData.status) {
      oldData.status = newData.status;
    }

    const updatedData = await oldData.save();

    res.send(updatedData);
  } catch (er) {
    console.log(er);
  }
});


// Delete Cart
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Cart.findByIdAndDelete(id);

  res.send(`Cart with id ${id} deleted`);
});

// Create new Cart
router.post("/", async (req, res) => {
  // Business logic

  const data = req.body;

  const newProduct = new Cart({
    userID: data.userID,
    productID: data.productID,
    Qty: data.Qty,
    status: data.status || 'pending',
  });

  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});

module.exports = router;
















// ES5
// Moudle import export

// var express = require("express");
// module.exports = express
// var express = require("express");


// ES6 => 2015
// import express from "express";
// export express;

// let
// const

// => compile/transpile to ES5


