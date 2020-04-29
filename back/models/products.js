const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;