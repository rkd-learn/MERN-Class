// JS -> ES->5
// const express = require("express");

// JS-> EC-> 6+
import express from "express";





const app = express();


app.use(express.json())

function logger(req, res, next) {
  const url = req.url;
  const method = req.method;
  console.log(url, method)

  next()
}

app.use(logger)


//REST API
//XML SOAP

const users = [
  {
    id: 1,
    name: "raj",
    address: "New Baneshwor",
    age: 28,
  },
  {
    id: 2,
    name: "kumar",
    address: "New Baneshwor",
    age: 29,
  },
  {
    id: 3,
    name: "dhiraj",
    address: "USA",
    age: 28,
  },
];

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/user/:id", (req, res) => {

  const id = req.params.id;

  const currentUser = users.find(a => a.id === Number(id))

  if (currentUser) {
    res.json(currentUser)
    return
  }
  res.status(404).send("User not found")
})

app.post("/user", (req, res) => {

  users.push(req.body)

  res.json(req.body)
})

app.listen(3004, () => {
  console.log("Server is listening on port 3004");
});
