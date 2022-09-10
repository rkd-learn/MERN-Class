const express = require("express");

const router = express.Router();

const User = require("../db/models/users");

const bcrypt = require("bcryptjs")

const { createToken } = require('../utils/helpers')

const validateUser = require("../middleware/auth.middleware")

// create user
router.post("/signup", async (req, res) => {
  const { name, email, password, address, shippingAddress } = req.body
  try {

    const hash = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      address: [address],
      shippingAddress: shippingAddress ? [shippingAddress] : undefined,
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

// 
router.post("/guest", async (req, res) => {

  const { name, email, address, shippingAddress } = req.body

  try {
    
    const newUser = new User({
      name,
      address: [address],
      shippingAddress: shippingAddress ? [shippingAddress] : undefined,
      email,
    });

    const savedUser = await newUser.save();

    res.send(savedUser);
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
      return res.status(400).json({
        error: "User not found"
      })
    }

    const isPasswordMatched = await bcrypt.compare(password, dbUser.password)

    if (!isPasswordMatched) {
      return res.status(400).json({
        error: "password not matched"
      })
    }

    const accessToken = createToken(dbUser)

    res.json({
      accessToken
    })


  } catch (error) {
    console.error(error)
    return res.status(400).send(error.message);
  }
});



// list all user
router.get("/list", validateUser, async (req, res) => {
  const users = await User.find({});

  res.send(users);
});

router.get("/profile",validateUser,async(req,res)=>{
  const userID= req.headers.userID

  if(userID){
    const user = await User.findById(userID);

    res.send(user);
  } else {
    res.status(400).send({
      message: "ERROR",
    });
  }

})

router.get("/:id", validateUser, async (req, res) => {
  const id = req.params.id;

  const user = await User.findById(id);

  res.send(user);
});


// user update
router.put("/shipping/:id", async (req, res) => {
  const id = req.params.id;

  const data = req.body;

  const alreadySavedUser = await User.findById(id);

  if (data.shippingAddress) {
    alreadySavedUser.shippingAddress.push(data.shippingAddress)
  }

  const updatedUser = await alreadySavedUser.save();

  res.send(updatedUser);
});

// user update
router.put("/update/:id", validateUser, async (req, res) => {
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

router.delete("/delete/:id", validateUser, async (req, res) => {
  const id = req.params.id;

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    res.status(400).send("The user you trying to delete is not exist");
    return;
  }

  res.send(deletedUser);
});

module.exports = router;
