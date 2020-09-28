const multer = require('multer');
const jimp = require('jimp');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const productId = req.params.id;
        const folder = `./uploads/images/products/${productId}`
        fs.access(folder, fs.constants.F_OK, () => {
            if (!fs.constants.F_OK) {
                return fs.mkdir(folder, {recursive: true}, error => cb(error, folder));
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
            const widthProps = image.bitmap.width;
            const heightProps = image.bitmap.height;
            if (widthProps < heightProps) {
                await image.resize(400, 800);
                await image.quality(70);
                await image.writeAsync(file.path);
            } else {
                await image.resize(1200, 800);
                await image.quality(70);
                await image.writeAsync(file.path);
            }
        })
    )

    next();
};

module.exports = {
    uploadImages,
    optimizeImages
};