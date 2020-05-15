const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

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

const uploadFiles = upload.array('images', 10);

const uploadImages = (req, res, next) => {
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            if (err.code === "LIMIT_UNEXPECTED_FILE") {
                console.log(err);
            }
        } else if (err) {
            console.log(err);
        }

        next();
    })
};

const optimizeImages = async (req, res, next) => {
    await Promise.all(
        req.files.map(async file => {
            const image = await jimp.read(file.path);
            await image.resize(420, 620);
            await image.quality(80);
            await image.writeAsync(file.path);
        })
    )
    
    next();
};

module.exports = {
    uploadImages,
    optimizeImages
};