const mongoose = require('mongoose');

// Don't need to connect to db in here because you will be in index.js

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['fruit', 'vegetable', 'dairy']
    }
})

// Compile model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;