const mongoose = require("mongoose");

const taskCardSchema = new mongoose.Schema({
  task: String,
  state: String,
});

const Task = mongoose.model("Task", taskCardSchema);

module.exports = Task;
