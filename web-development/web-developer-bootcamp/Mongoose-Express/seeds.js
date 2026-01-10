/* 
- Seeds file to add data to the DB. Give it some inital data 
- Connects to the DB because this is a file we could run on its own to add data to the DB
- Makes it so we don't have to manually add data to the DB
- Isolate this from index of application
*/
const Product = require('./models/product')

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/farmStand')
.then(() => {
    console.log('Connection Open')
})
.catch(err => {
    console.log('Error', err)
})

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })

// p.save().then( data => {
//     console.log(data)
// }).catch(err => {
//     console.log('Error', err)
// })

const seedProducts = [
    {
        name: 'Ruby Grapefruit',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Apple',
        price: 1.99,
        category: 'fruit'
    }
]

// If one thing fails validation, nothing will be inserted into the DB
Product.insertMany(seedProducts)
.then(data => {
    console.log(data)
})
.catch(err => {
    console.log('Error', err)
})