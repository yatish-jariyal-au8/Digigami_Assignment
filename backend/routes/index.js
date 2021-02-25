const express = require("express");
const Task = require("../models/TaskModel");
const State = require("../models/StateModel");

const router = express.Router();

//create a task
router.post("/create", async (req, res) => {
  const { task, state } = req.body;
  try {
    const newTask = new Task({ task, state });
    newTask
      .save()
      .then(() => res.status(201).send(newTask))
      .catch((err) => {
        console.log("err", err);
        res.status(400).send(err);
      });
  } catch (error) {
    console.log("error", error);
    res.status(400).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const task = await Task.findByIdAndDelete(id);
    res.send({ status: 200, message: "Task deleted successfully" });
  } catch (error) {
    res.status(404).send("Task not found");
    console.error(error);
  }
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { state } = req.body;
  console.log("In here edit", state);
  try {
    const task = await Task.findByIdAndUpdate(id, { state });
    console.log("task", task);
    res.send(task);
  } catch (error) {
    res.status(400).send("Task not edited");
    console.error(error);
  }
});

//get all tasks
router.get("/get", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.post("/state/create", async (req, res) => {
  const { title, position } = req.body;
  try {
    let states = await State.find();
    if (states && states.length > 0) {
      const { _id, statesList } = states[0];
      const newStates = [...statesList];
      newStates.splice(position, 0, title);
      State.findByIdAndUpdate(_id, { statesList: [...newStates] })
        .then(() => res.send(newStates))
        .catch((err) => res.status(400).send(err));
    } else {
      const newState = new State({ statesList: [title] });
      newState
        .save()
        .then(() => res.send(newState.states))
        .catch((err) => res.status(400).send(err));
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

router.get("/state/get", async (req, res) => {
  try {
    const state = await State.find();
    if (state && state.length > 0) {
      const { statesList, _id } = state[0];
      res.send(statesList);
    } else {
      res.send([]);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
