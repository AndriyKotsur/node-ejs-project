const express = require('express');
const Product = require('../models/products');
const router = express.Router();

/* Get Products */
router.get('/products', async function (req, res, next) {
  const filter = req.body.filter || {};

  try {
    const products = await Product.find(filter)
    
    if(!products) {
      return res.status(404).send()
    }
    res.status(200).send(products)
  } catch {
    return res.status(404).send(e)
  }
});

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

router.patch('/products/:id', async function (req, res, next) {
  const updates = Object.keys(req.body);
  const allowUpdates = ['title', 'image'];
  const isValidOperation = updates.every((update) => allowUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({
      error: 'Invalid updates'
    })
  }

  try {
    const product = await Product.findOne({
      _id: req.params.id
    });

    if (!product) {
      return res.status(404).send();
    }

    updates.forEach((update) => product[update] = req.body[update])
    await product.save()
    res.send(product)
  } catch {
    res.status(400).send(e)
  }
});

router.delete('/products/:id', async function (req, res, next) {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id
    })

    if (!product) {
      return res.status(404).send();
    }

    res.send(product)
  } catch {
    res.status(500).send()
  }
})

module.exports = router;