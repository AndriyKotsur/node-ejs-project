const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const upload = require('../middleware/upload');

/* Get Products */
router.get('/products', async function (req, res, next) {
  const filter = {};

  try {
    const products = await Product.find(filter)

    if (!products) {
      return res.status(404).send()
    }
    res.status(200).send(products)
  } catch {
    return res.status(404).send(e)
  }
});

/* Add products */
router.post('/products', async function (req, res, next) {
  const product = new Product({
    ...req.body
  })

  try {

    await product.save()
    res.status(201).send(product)
  } catch (e) {
    res.status(400).send(e)
  }

});

/* Add images */
router.put('/products/image/:id', upload.uploadImages, async function (req, res, next) {

  const imgArr = [];
  const productId = req.params.id;
  console.log(req.files);
  
  req.files.map((file) => {
    imgArr.push(file.location); 
  });
  console.log(imgArr);
  
  await Product.findOneAndUpdate({
    _id: productId
  }, {
    imageUrl: imgArr
  }, function (err, product) {
    if (err) {
      res.status(500).send();
    } else {
      
      res.send(product);
      console.log(product);
    }
  });
});

/* Delete product */
router.delete('/products/:id', async function (req, res, next) {
  const productId = req.params.id;

  try {
    const product = await Product.findOneAndDelete({
      _id: productId
    })

    if (!product) {
      return res.status(404).send();
    }

    res.status(204).send(product)
  } catch {
    res.status(500).send()
  }
});

/* Delete products */
router.delete('/products/', async function (req, res, next) {
  const filter = {};
  try {
    const products = await Product.deleteMany(filter);

    if (!products) {
      return res.status(404).send();
    }

    res.send(products)
  } catch {
    res.status(500).send()
  }
})

module.exports = router;