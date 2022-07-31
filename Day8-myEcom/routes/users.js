const express = require("express");

const router = express.Router();

const User = require("../db/models/users");

// list all user
router.get("/list", async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.send(user);
});

// create user
router.post("/create", async (req, res) => {

  try {
    const newUser = new User({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
    });

    await newUser.save();

    res.send(`user created with name:${newUser.name}`);
  } catch (error) {
    if (error.message?.includes("duplicate")) {
      res.status(400).send(`User with name ${req.body.name} is already exist `);

      return;
    }

    res.status(400).send(error.message);
  }
});

// user update
router.put("/update/:id", async (req, res) => {
  const id = req.params.id;

  const dataToUpdate = req.body;

  const alreadySavedUser = await User.findById(id);

  if (dataToUpdate.name) {
    alreadySavedUser.name = dataToUpdate.name;
  }

  if (dataToUpdate.address) {
    alreadySavedUser.address = dataToUpdate.address;
  }

  if (dataToUpdate.email) {
    alreadySavedUser.email = dataToUpdate.email;
  }

  const updatedUser = await alreadySavedUser.save();

  res.send(updatedUser);
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    res.status(400).send("The user you trying to delete is not exist");
    return;
  }

  res.send(deletedUser);
});

module.exports = router;
