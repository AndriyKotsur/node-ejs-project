const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Product = require('../models/products');

/* GET home page */

router.get('/', function (req, res, next) {
  res.render('index');
});

/* Lang pages */
router.get('/ua', function (req, res, next) {
  try {
    res.cookie('_locale_lang', 'uk', {
      maxAge: 6000000,
      httpOnly: true
    });

    res.redirect('back');

  } catch {
    res.status(500).send();
  }
});

router.get('/en', function (req, res, next) {
  res.cookie('_locale_lang', 'en', {
    maxAge: 6000000,
    httpOnly: true
  });
  res.redirect('back');
});

router.get('/ru', function (req, res, next) {
  res.cookie('_locale_lang', 'ru', {
    maxAge: 6000000,
    httpOnly: true
  });
  res.redirect('back');
});

/* Another pages */
router.get('/partnership', function (req, res, next) {
  res.render('partnership');
});

router.get('/about-us', function (req, res, next) {
  res.render('about-us');
});

router.get('/contacts', function (req, res, next) {
  res.render('contacts');
});
/* Catalogue */
router.get('/catalogue', async function (req, res, next) {
  const filter = {};
  const itemsPerPage = 3;
  const pageNum = req.query.page || 1;
  const langConfig = req.acceptsLanguages();
  const langUrl = req.cookies._locale_lang;
  const langId = langUrl ? langUrl : langConfig[0];
  console.log(langId);

  if (req.query.sort) {
    filter.productType = req.query.sort;
  }

  try {
    const products = await Product.find(filter)
      .skip((itemsPerPage * pageNum) - itemsPerPage)
      .limit(itemsPerPage);

    const productsCount = await Product.countDocuments(filter);

    res.render('catalogue', {
      products: products,
      pageNum: pageNum,
      pages: Math.ceil(productsCount / itemsPerPage),
      query: req.query.sort,
      langId: langId
    });
  } catch {
    res.status(500).send();
  }
});

router.get('/catalogue-item/:id', async function (req, res, next) {

  const langConfig = req.acceptsLanguages();
  const langUrl = req.cookies._locale_lang;
  const langId = langUrl ? langUrl : langConfig[0];

  try {
    const product = await Product.findOne({
      _id: req.params.id,
    });

    if (!product) {
      return res.status(404).send();
    }

    res.render('catalogue-item', {
      product,
      langId: langId
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
      res.status(202).send('Request accepted');

      transport.close();
    }
  })
});


module.exports = router;