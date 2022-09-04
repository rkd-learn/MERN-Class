const express = require("express");
const router = express.Router();

// Importing product model
const Order = require("../db/models/order");

// get list of cats admin
router.get("/list", async (req, res) => {

  const carts = await Order.find();

  res.send(carts);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const orderData = await Order.findById(id)
    .populate({
      path: 'cartId',
    })
  res.send(orderData)
})

// Update Orders
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const oldData = await Order.findById(id);

    const newData = req.body;

    if (newData.paymentStatus) {
      oldData.paymentStatus = newData.paymentStatus
    }

    if (newData.deliveryStatus) {
      oldData.deliveryStatus = newData.deliveryStatus;
    }

    const updatedData = await oldData.save()

    res.send(updatedData);
  } catch (er) {
    console.log(er);
  }
});

// Delete Order
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await Order.findByIdAndDelete(id);

  res.send(`Order with id ${id} deleted`);
});

// Create new Order and add product to cart
router.post("/", async (req, res) => {
  // Business logic

  const data = req.body;

  const orderItem = new Order({
    cartId: data.cartId,
    userID: data.userID,
    paymentStatus: 'pending',
    deliveryStatus: 'pending'
  })

  const savedOrder = await orderItem.save();
  res.send(savedOrder);
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


