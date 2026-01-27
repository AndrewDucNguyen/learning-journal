# Mongo Relationships with Express

## Defining Our Farm & Product Models
- Create farm model
```js
// farm.js
const mongoose = require('mongoose')
const { Schema } = mongoose;

const farmSchema = new Schema ({
    name:{
        type: String,
        required: [true, 'Must have name']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Farm = mongoose.model('Farm', farmSchema)
module.exports = Farm;

// product.js
const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ['fruit', 'vegetable', 'dairy']
    },
    farm: {
        type: Schema.Types.ObectId.
        ref: 'Farm'
    }
})

const Product = mongoose.model('Product', productSchema)
module.exports = Product;

```

- Inside the index.js, we are going to setup the routes for the farm and products

```js
const Farm = require('./models/farm') 
// FARM ROUTES
app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms' async (req, res) => {
    const = new Farm(req.body)
})

// Create new folder in views/farms/new.ejs and create a ejs template

```