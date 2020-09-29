require('dotenv').config();
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3Config = new aws.S3({
    accessKeyId: process.env.AWS_IAM_USER_KEY,
    secretAccessKey: process.env.AWS_IAM_USER_SECRET,
    region: process.env.AWS_REGION
});

const fileFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|svg)$/)) {
        return cb(new Error('Please upload an image'))
    }
    cb(undefined, true)
};

const multerS3Config = multerS3({
    s3: s3Config,
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req, file, cb) {
        cb(null, {
            fieldName: file.fieldname
        })
    },
    key: function (req, file, cb) {
        cb(null, 'product-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    limits: {
        fileSize: 20000000
    },
    fileFilter: fileFilter,
    storage: multerS3Config
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

module.exports = {
    uploadImages
};