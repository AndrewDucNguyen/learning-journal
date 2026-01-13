// This is setting up the Express server/app
const express = require('express');
const app = express();
const path = require('path');

// Requiring our model
const Product = require('./models/product')

// Mongoose setup/integration
// This will typically be in a separate file, but its easier to setup here first

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() => {
    console.log('Connection Open')
})
.catch(err => {
    console.log('Error', err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.get('/products', async (req, res) => {
    const products = await Product.find({})
    console.log(products)
    res.render('products/index', {products})
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    console.log(product)
    res.render('products/details', {product})
})
