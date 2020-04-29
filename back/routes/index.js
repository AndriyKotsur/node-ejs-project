var express = require('express');
var router = express.Router();
const Product = require('../models/products');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/catalogue', function (req, res, next) {
  res.render('catalogue');
});

router.get('/partnership', function (req, res, next) {
  res.render('partnership');
});

router.get('/about-us', function (req, res, next) {
  res.render('about-us');
});

router.get('/contacts', function (req, res, next) {
  res.render('contacts');
});

module.exports = router;