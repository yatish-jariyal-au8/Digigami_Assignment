const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const indexRouter = require("./routes/index");

const port = process.env.PORT || 5000;
const mongouri = process.env.mongouri;

const app = express();
app.use(express.json());
app.use(cors());

app.listen(port, (req, res) => {
  console.log("Listening to port " + port);
});

console.log("uri", mongouri);

mongoose.connect(
  mongouri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  },
  () => {
    console.log("Connected to mongodb");
  }
);

app.use("/", indexRouter);
