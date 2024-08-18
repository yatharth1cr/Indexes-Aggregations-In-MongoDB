var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var path = require("path");
var session = require("express-session");
var MongoStore = require("connect-mongo");

var User = require("./models/User");
const sampleUser = require("./sampleUser");

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
// Basic usage
app.use(
  session({
    secret: "foo",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/user-article",
    }),
  })
);

// routes
app.get("/", (req, res, next) => {
  res.send("Welcome to Express App");

  // using foreach to save each user
  sampleUser.forEach((userObject) => {
    // created new user
    var user = new User(userObject);

    // save the created user
    user
      .save()
      .then((savedUser) => {
        console.log("User saved successfully");
      })
      .catch((err) => {
        console.error("Error saving the user:", err);
      });
  });
});

// listener
app.listen(4000, () => {
  console.log("Server is listening at 4k");
});
