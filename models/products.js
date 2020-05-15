const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productTitle: {
        type: Object,
        required: true
    },
    productType: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    productDescription: {
        type: Object,
        required: true
    },
    imageUrl: {
        type: Array
    }
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;