// This is setting up the Express server/app
const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')

// Requiring our model
const Product = require('./models/product')

// Mongoose setup/integration
// This will typically be in a separate file, but its easier to setup here first

const mongoose = require('mongoose');

const categories = ['fruit', 'vegetable', 'dairy'];

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() => {
    console.log('Connection Open')
})
.catch(err => {
    console.log('Error', err)
})

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', {products, category})
    }
    else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
    
})

// Serves the form
app.get('/products/new', (req, res) => {
    res.render('products/new', {categories})
})

// Submit the form and create the new product\
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body)
    await newProduct.save();

    // Don't want users refreshing the page and re-submiting the same thing over and over
    res.redirect(`/products/${newProduct._id}`)
})

app.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/details', {product})
})

// Serve edit form
app.get('/products/:id/edit', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', {product, categories})
})

app.put('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true})
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id)
    res.redirect('/products')
})