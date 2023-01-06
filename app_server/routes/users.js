var express = require("express");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
var router = express.Router();

// secret key
dotenv.config();
const secret_key = process.env.secret_key;

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

// creating a new user
router.post("/signup", (req, res, next) => {
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: User.hashPassword(req.body.password),
  }).then(
    (user) => {
      console.log("User created with id", user._id);
      let token;
      try {
        token = jwt.sign({ _id: user._id, email: user.email }, secret_key, {
          expiresIn: "5h",
        });
      } catch (err) {
        console.log("Error in login");
        res.statusCode = 400;
        res.json("Please try again");
      }
      res.statusCode = 200;
      res.json({
        success: true,
        data: {
          user: user,
          token: token,
        },
      });
    },
    (err) => {
      console.log("Error in creating new user");
      res.statusCode = 400;
      res.json("Try using another email id!");
    }
  );
});

router.post("/login", (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(
      (user) => {
        if (user == null) {
          res.statusCode = 404;
          res.send("User not found");
        } else if (!User.comparePassword(req.body.password, user.password)) {
          res.statusCode = 401;
          res.send("Incorrect email or password");
        }
        // console.log("User found");
        // res.json(user);
        return user;
      },
      (err) => {
        console.log("Error in login");
        res.statusCode = 400;
        res.json("Please try again");
      }
    )
    .then(
      (user) => {
        let token;
        try {
          token = jwt.sign({ _id: user._id, email: user.email }, secret_key, {
            expiresIn: "5h",
          });
        } catch (err) {
          console.log("Error in login");
          res.statusCode = 400;
          res.json("Please try again");
        }
        res.statusCode = 200;
        res.json({
          success: true,
          data: {
            user: user,
            token: token,
          },
        });
      },
      (err) => {
        console.log("Error in login");
        res.statusCode = 400;
        res.json("Please try again");
      }
    );
});

module.exports = router;
