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
app.set('views engine', 'ejs');

app.listen(3000, () => {
    console.log('listening on port 3000')
})

app.get('/dog', (req, res) => {
    res.send('woof');
})

