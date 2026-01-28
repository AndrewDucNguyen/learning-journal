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
app.post('/farms' async (req, res) => {
    const farms = await Farm.find({})
    res.render('farms/index', {farms})
})

app.get('farms/:id' async (req, res) => {
    // Populate the items for that specific farm
    const farm = Farm.findById(req.params.id).populate('products')
    res.render('/farms/show', {farm})
})

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms', async(req, res) => {
    const farm = new Farm(req.body)
    await farm.save
    res.redirect('/farms')
})

// farm products
app.get('/farms/:id/products/new', (req, res) => {
    const { id } = req.params;
    res.render('products/new', {categories, id})
})

app.post('/farms/:id/products', async (req, res) => {
    // Find farm
    const {id} = req.params;
    const farm = await Farm.findById(id);

    // Create new product
    const { name, price, category } = req.body
    const product = new Products({name, price, category})

    // Push the new products into that specific farm
    farm.products.push(product)
    // The specific product will have the farm that it was created for only
    product.farm = farm

    await farm.save();
    await product.save();
    
})

// Create new folder in views/farms/new.ejs and create a ejs template
```

## Deletion Mongoose Middleware
- You will need to think about what happens to other things when a user is deleted or a user deletes their comment and it has replies on it
```js
app.delete('/farms/:id', async (req, res) => {
    const farm = await farm.findByIdAndDelete(req.params.id)
    // We could have a code that deletes the products from the farm, but theres another way. We need to delete all the refernces as well
    res.redirect('/farms')
})
```
- We can use a mongoogse middleware for the deletion, but you will have to define pre/post in the farm schema 

```js
const Product = require('./product')
/* farm.js file
...
all the previous schema code
*/

/* 
- If you cann async function, you don't have to call next()
- Since you need the data from the farm, you have to do post because the pre doesn't have access to that data since it runs before the query
*/
farmSchema.post('findOneAndDelete', async function(farm) {
    if(farm.products.length) {
        await Product.deleteMany({ _id: {$in: farm.products }})
    }
})
```