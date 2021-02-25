const mongoose = require("mongoose");

const StateCardSchema = new mongoose.Schema({
  statesList: [{type: String}],
});

const State = mongoose.model("State", StateCardSchema);

module.exports = State;
