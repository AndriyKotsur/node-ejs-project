const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Product = require('../models/products');

/* GET home page. */

router.get('/', function (req, res, next) {
  res.render('index');
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

router.get('/catalogue', async function (req, res, next) {
  const filter = {};
  const itemsPerPage = 3;
  const pageNum = req.query.page || 1;

  if (req.query.sort) {
    filter.productType = req.query.sort;
  }
  console.log(filter.productType);

  
  try {
    const products = await Product.find(filter)
      .skip((itemsPerPage * pageNum) - itemsPerPage)
      .limit(itemsPerPage);

    console.log(filter);
    const productsCount = await Product.countDocuments(filter);
    console.log(productsCount);
    

    res.render('catalogue', {
      products: products,
      pageNum: pageNum,
      pages: Math.ceil(productsCount / itemsPerPage),
      query: req.query.sort
    });
  } catch {
    res.status(500).send();
  }
});

router.get('/catalogue-item/:id', async function (req, res, next) {

  try {
    const product = await Product.findOne({
      _id: req.params.id
    });
    console.log(product);

    if (!product) {
      return res.status(404).send();
    }

    res.render('catalogue-item', {
      product
    });

  } catch {
    res.status(500).send();
  }
});

/* SEND EMAIL */
router.post('/send-request', function (req, res, next) {

  const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: 'kotsurandriy@gmail.com',
    to: 'kotsurandriy@gmail.com',
    subject: 'Нове повідомлення із веб-сайту stm-trade.com.ua',
    html: `
    <h2>Ви отримали нове повідомлення від користувача ${req.body.name} із форми зв\'язку на вебсайті.</h2>
    <table style='width: 100%'>
    <tr style='background-color: #f8f8f8;'>
      <td>Контактний телефон</td>
      <td>${req.body.phone}</td>
    </tr>
    <tr style='background-color: #f8f8f8;'>
      <td>Повідомлення</td>
      <td>${req.body.message}</td>
    </tr>
    </table>`
  };

  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      return console.log(err);
    } else {
      console.log(data);
      res.status(202).send('Request accepted');

      transport.close();
    }
  })
});


module.exports = router;