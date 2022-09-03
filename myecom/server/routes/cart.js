const express = require("express");
const router = express.Router();

// Importing product model
const Cart = require("../db/models/cart");
const CartItem = require("../db/models/cartItem");

// get list of cats admin
router.get("/list", async (req, res) => {

  const carts = await Cart.find();

  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const cartData = await Cart.findById(id)
    .populate({
      path: 'items',
      populate: {
        path: 'product',
      }
    })
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

    if (newData.productID && !oldData.products.includes(newData.productID)) {
      oldData.products.push(newData.productID)
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

// Create new Cart and add product to cart
router.post("/", async (req, res) => {
  // Business logic

  const data = req.body;

  const cartItem = new CartItem({
    product: data.productID,
    Qty: data.Qty
  })

  const savedCartItem = await cartItem.save();

  const newProduct = new Cart({
    userID: data.userID,
    items: [savedCartItem._id],
    status: data.status || 'pending',
  });

  const savedProduct = await newProduct.save();

  res.send(savedProduct);
});

// add product on existing cart
router.put("/:id/existing", async (req, res) => {

  // Business logic
  const id = req.params.id;

  const oldData = await Cart.findById(id);

  if (!oldData) {
    res.status(400).json({
      message: `Cart not found with id:${id}`
    })
  }

  const newData = req.body;

  const oldCartItem = await CartItem.findOne({
    product: newData.productID
  })

  if (oldCartItem) {
    oldCartItem.Qty = oldCartItem.Qty + newData.Qty

    await oldCartItem.save()
  }

  if (newData.productID && !oldCartItem) {
    const cartItem = new CartItem({
      product: newData.productID,
      Qty: newData.Qty || 0
    })

    const savedCartItem = await cartItem.save();

    oldData.items.push(savedCartItem._id)
  }

  const updatedData = await oldData.save();

  res.send(updatedData);
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


