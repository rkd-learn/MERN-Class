const express = require("express");

const router = express.Router();

const User = require("../db/models/users");

const bcrypt = require("bcryptjs")

const { createToken } = require('../utils/helpers')

const validateUser = require("../middleware/auth.middleware")

// create user
router.post("/signup", async (req, res) => {

  const { name, email, password, address } = req.body

  try {

    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      address,
      email,
      password: hash
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


// user login
router.post("/login", async (req, res) => {

  const { email, password } = req.body

  try {

    const dbUser = await User.findOne({
      email
    })

    if (!dbUser) {
      res.status(400).json({
        error: "User not found"
      })
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)

    if (!isPasswordMatched) {
      res.status(400).json({
        error: "password not matched"
      })
    }

    const accessToken = createToken(dbUser)

    res.json({
      accessToken
    })


  } catch (error) {
    console.error(error)
    res.status(400).send(error.message);
  }
});



// list all user
router.get("/list", validateUser, async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

router.get("/byid/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.send(user);
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
