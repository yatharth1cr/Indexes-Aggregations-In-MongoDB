var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var path = require("path");

// connect mongoDB
mongoose
  .connect("mongodb://localhost/user-article", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected true");
  })
  .catch((err) => {
    console.log("Connection error: ", err);
  });

// instantiate the app
var app = express();

// middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res, next) => {
  res.send("Welcome to Express App");
});

// listener
app.listen(4000, () => {
  console.log("Server is listening at 4k");
});
