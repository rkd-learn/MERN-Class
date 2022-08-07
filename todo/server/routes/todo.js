const express = require("express");

const router = express.Router();

const Todo = require("../db/models/todo");

// list all user
router.get("/", async (req, res) => {
  const users = await Todo.find({});

  res.send(users);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  const user = await Todo.findById(id);

  res.send(user);
});

// create user
router.post("/", async (req, res) => {

  try {
    const newTodo = new Todo({
      todo: req.body.todo,
      isDone: req.body.isDone || false
    });

    const savedTodo = await newTodo.save();

    res.status(200).json(savedTodo);
  } catch (error) {
    if (error.message?.includes("duplicate")) {
      res.status(400).send(`unable to create todo`);

      return;
    }

    res.status(400).send(error.message);
  }
});

// user update
router.put("/:id", async (req, res) => {
  const id = req.params.id;

  const dataToUpdate = req.body;

  const alreadySavedTodo = await Todo.findById(id);

  if (dataToUpdate.todo) {
    alreadySavedTodo.todo = dataToUpdate.todo;
  }

  if (dataToUpdate.isDone) {
    alreadySavedTodo.isDone = dataToUpdate.isDone;
  }

  const updatedUser = await alreadySavedTodo.save();

  res.send(updatedUser);
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const deletedTodo = await Todo.findByIdAndDelete(id);

  if (!deletedTodo) {
    res.status(400).send("The user you trying to delete is not exist");
    return;
  }

  res.send(deletedTodo);
});

module.exports = router;
