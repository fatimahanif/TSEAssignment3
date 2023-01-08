var express = require("express");
var router = express.Router();

// requiring models
var Service = require("../models/service");
var Product = require("../models/product");
var Admin = require("../models/admin");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Admin Page" });
});

//adding an admin user
router.post("/admin", function (req, res, next) {
  Admin.create(req.body)
    .then(
      (admin) => {
        console.log("Admin added", admin);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(admin);
      },
      (err) => {
        console.log(err);
      }
    )
    .catch((err) => console.log(err));
});

// services
// add a service
router.post("/service", function (req, res, next) {
  Service.create(req.body)
    .then(
      (service) => {
        console.log("Service added", service);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(service);
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => next(err));
});
// delete a service
router.delete("/service/:id", function (req, res, next) {
  Service.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      return next(err);
    }
    // result
    res.json(result);
  });
});
//update a service
router.put("/service/:id", function (req, res, next) {
  Service.findOneAndUpdate(
    { _id: req.params.id },
    { detail: req.body.detail, name: req.body.name },
    function (err, result) {
      if (err) {
        return next(err);
      }
      // result
      res.json(result);
    }
  );
});

// products
// add a product
router.post("/product", function (req, res, next) {
  Product.create(req.body)
    .then(
      (product) => {
        console.log("Product added", product);
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(product);
      },
      (err) => {
        next(err);
      }
    )
    .catch((err) => next(err));
});
// delete a product
router.delete("/product/:id", function (req, res, next) {
  Product.deleteOne({ _id: req.params.id }, function (err, result) {
    if (err) {
      return next(err);
    }
    // result
    res.json(result);
  });
});
//update a product
router.put("/product/:id", function (req, res, next) {
  Product.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name, detail: req.body.detail, service: req.body.service },
    function (err, result) {
      if (err) {
        return next(err);
      }
      // result
      res.json(result);
    }
  );
});

module.exports = router;
