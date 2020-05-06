const express = require('express');
const Product = require('../models/products');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');

/* STORAGE INIT */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const productId = req.params.id;
    const folder = `./uploads/images/products/${productId}`
    fs.exists(folder, exist => {
      if (!exist) {
        return fs.mkdir(folder, error => cb(error, folder))
      }
      return cb(null, folder)
    })
  },
  filename: function (req, file, cb) {
    cb(null, "product-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  limits: {
    fileSize: 20000000
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
      return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
  },
  storage: storage
});

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
router.patch('/products/:id/image', upload.array('imageUrl', 10), async function (req, res, next) {

  const imgArr = [];
  req.files.map((file) => {
    imgArr.push('/' + file.path);
  });


  await Product.findOneAndUpdate({
    _id: req.params.id
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

/* FILES MANAGEING */
router.get('/products/listAllFiles/:id', function (req, res, next) {
  const folderId = req.params.id;
  const files = fs.readdirSync(`./uploads/images/products/${folderId}`);

  if (!files) {
    res.status(404).send('Empty folder');
  }
  res.json(files);
});

router.get('/products/deleteAllFiles/:id', function (req, res, next) {
  const folderId = req.params.id;
  fs.readdir(`./uploads/images/products/${folderId}`, function (err, items) {
    console.log(items);

    items.forEach(function (item) {
      console.log(item);
      fs.unlinkSync(`./uploads/images/products/${folderId}/${item}`);
    })

    res.status(204).send('Files deleted');
  });
});

/* UPDATE */
router.patch('/products/:id', async function (req, res, next) {
  const updates = Object.keys(req.body);
  const allowUpdates = ['productTitle', 'productType', 'productDescription'];
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
/* DELETE */
router.delete('/products/:id', async function (req, res, next) {
      const productId = req.params.id;

      const removeFolder = function (folderPath) {
        if (fs.existsSync(folderPath)) {
            console.log(folderPath);
            
            fs.readdirSync(folderPath).forEach(function(file){
              const currentPath = folderPath + '/' + file;
              console.log(currentPath);
              
              if(fs.lstatSync(currentPath).isDirectory()) {
                removeFolder(currentPath);
              } else {
                fs.unlinkSync(currentPath);
              }
            });
            fs.rmdirSync(folderPath);
          };
        };
        removeFolder(`./uploads/images/products/${productId}`);


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