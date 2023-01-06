var express = require("express");
const User = require("../models/user");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// creating a new user
router.post("/signup", (req, res, next) => {
  let password = req.body.password;
  let hashedPassword = User.hashPassword(password);
  console.log(hashedPassword);
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  }).then(
    (user) => {
      console.log("User created with id", user._id);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    },
    (err) => {
      console.log("Error in creating new user");
      res.statusCode = 400;
      res.json("Try using another email id!");
    }
  );
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email }).then(
    (user) => {
      if (user == null) {
        res.statusCode = 404;
        res.send("User not found");
      } else if (!User.comparePassword(req.body.password, user.password)) {
        res.statusCode = 401;
        res.send("Incorrect email or password");
      }
      console.log("User found");
      res.json(user);
    },
    (err) => {
      console.log("Error in login");
    }
  );
});

module.exports = router;
