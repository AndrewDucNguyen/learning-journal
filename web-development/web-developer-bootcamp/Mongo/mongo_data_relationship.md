# Data Relationships with Mongo
- How to structure and store related mongo data
- Data is associated with eachother in some way

## Intro to Mongo Relationships
- Relationship data means, in the real world, that we have a lot of data/entity that are stored in the DB and they're connected in some type of way
    - It's rarely individual/isolated
- Has to have some type of information stored so people can't like a post more than once, how to comment on a comment
- How do we model different relationships
- Patterns in mongo for relationships

## SQL Relationships Overview
- Store data's in tables 
    - Tables exist in isolation and need to make strict schemas
- One to Many relationship table are able to reference each other directly
- Many to Many tables needs to have another table to show the reference/relationship between each other (so this will be 3 tables total)

## Mongo One to Few
- Easiest one of all
- Embed the data directly in the document
```js
{
    name: 'Tommy Cash',
    savedAddresses: [
        {street: 'Rahukohtu 3', city: 'Tallinn', country: 'Estonia'},
        {street: 'Ravala 5', city: 'Tallinn', country: 'Estonia'}
    ]
}
```
- We have to think through when creating these relationships if we would ever need to access it direcctly and show everything or not

```js
// Models/user.js

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDemo')}
    .then( () => {
        console.log('Connected')
    })
    .catch( (err) => {
        console.log(err)
    })

const userSchema = new mongoose.Schema({
    first: String,
    last: String
    addresses: [
        {
            _id: {id: false}, // turns off mongoose from treating it as a schema
            address: String,
            city: String,
            state: String,
            country: String
        }
    ]
})

const User = mongoose.model('User', userSchema)

const makeUser = async () => {
    const u = new User({
        first: 'Harry',
        last: 'Potter'
    })
    u.addresses.push({
        street: '123 Sesame St.',
        city: 'New York',
        state: 'New York',
        country: 'USA
    })
    const res = await u.save();
    console.log(res)
}

const addAddress = async(id) => {
    const user = await User.findById(id)
    user.addresses.push({
        street: '456 Sesame St.',
        city: 'New York',
        state: 'New York',
        country: 'USA
    })
    const res = await user.save()
    console.log(res)
}

makeUser()
addAddress('1234235212341234') // need to add in ID of user you want to add in an address
```
- Mongoose automatically treats addresses as its own schema
- There may be limitations and sometimes would be better to separate out the relationship/information into separarte document and connect them in a different rather than embedding directly
    - Embedding directly is only good for small amount that you're embedding

## Mongo One to Many
- One option is to store your data separately, but then store references to document ID's somewhere inside the parent

```js
{
    farmName: 'Full Belly Farms',
    location: 'Guinda, CA',
    produce: [
        ObjectID('11343151360081'),
        ObjectID('28135130958130'),
        ObjectID('67945014757690')
    ]
}
```
- The object reference data is stored somewhere else
    - Typically and most common accessed by ID, but could be something else like name, or other property in the documet

```js
// Models/farm.js
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/relationshipDemo')}
    .then( () => {
        console.log('Connected')
    })
    .catch( (err) => {
        console.log(err)
    })

// Define child model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    season: {
        type: String,
        enum: ['Spring', 'Summer', 'Fall', 'Winter']
    }
})

Product.insertMany([
    {name:'Goddess Melon', price: 4.99, season: 'Summer'},
    {name:'Watermelon', price: 7.99, season: 'Spring'},
    {name:'Asparagus', price: 3.99, season: 'Fall'}
]})

// Create Farm Model
const { Schema } = mongoose;

const farmSchema = new mongoose.Schema({
    name: String,
    city: String,
    products:[{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}] // Most important part, you can do this approach or pull out schema above
})

// or

const farmSchema = new Schema({
    name: String,
    city: String,
    products:[{type: Schema.Types.ObjectId, ref: 'Product'}]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

const makeFarm = async () => {
    const farm = new Farm({name: 'Full Belly Farm', city: 'Guinda, CA'})
    const melon = await Product.findOne({name: 'Goddess Melon'})
    farm.products.push(melon)
}
```
- To reference the object ID, you have to use a specific mongoose object type provided by mongoose
- `ref` option is what tells Mongoose which model to use during population
    - Basically tells products which model to reference when populating
- The `farms.products.push(melon)` is not problematic because its not actually pushing the entire product into the array. It'll display that in the terminal until you do `.save()`
    - Inside the mongoDB it'l show that object ID reference instead of the entire object

## Terminology Clarification

### In Mongoose Schemas (like `farmSchema`):
- **Field/Property**: `products` is a **field** (or **property**) of the schema
- **Array Items/Elements**: Each ObjectId in the `products` array is an **item** (or **element**)
- **Key-Value Pairs**: In the schema definition, `name: String` is a **key-value pair** where:
    - `name` is the **key** (or **property name**)
    - `String` is the **value** (the data type)

### In JavaScript Objects:
- **Properties/Keys**: The identifiers (like `name`, `city`, `products`)
- **Values**: What's assigned to each property
- **Key-Value Pairs**: Together, a property and its value form a **key-value pair**
- Example: `{name: 'Full Belly Farms'}` - "name" is the key, "Full Belly Farms" is the value

### In JSON:
- Same terminology as JavaScript objects
- **Properties** and **values** form **key-value pairs**
- JSON is essentially a string representation of JavaScript objects

### Summary for `farmSchema`:
```js
const farmSchema = new mongoose.Schema({
    name: String,        // "name" is a field/property, "String" is the value (data type)
    city: String,        // "city" is a field/property, "String" is the value
    products: [...]      // "products" is a field/property containing an array
})
```
- `products` is a **field** containing an **array**
- Each ObjectId in the `products` array is an **item** (or **element**)
- Each line like `name: String` is a **key-value pair** (property: value)property inside the farmSchema to referenec the Product 

## Mongoose Populate
-  If you're console logging the farm, it'll show a aray of product property with just the reference ID
- You have a method called `populate()` when you use `ref` inside the scehma property/field item/value

```js
Farm.findOne({name: 'Full Belly Farms'})
.populate('products')
.then(farm => console.log(farm))
```

## One to Bajillions
- With thousands or more documents, it's more efficient to store a reference to the parent on the child document
- Could be more efficient to store a reference to the parent in the child instead of the opposite

- Here is an example of this in play with a tweet example
```js
const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
    username: String,
    age: Number
})

// Tweet Schema
const tweetSchema = new Schema({
    text: String,
    likes: Number,
    user: {type: Schema.Types.ObjectId, ref: 'User'} // user field is referencing User model

})

// User Model
const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweets', tweetSchema)

const makeTweet = async () => {
    const user = new User({username: 'chickenfan', age: 30})
    const tweet1 = new Tweet({text: 'Hello', likes: 0});

    tweet1.user = user; // associates the property to the user object
    user.save();
    tweet1.save();
}

// Populate
const findTweet = async() => {
    cosnt t = await tweet.findOne({}).populate(user) // Not the name of the model, its the name of the field
    console.log(t)
}

// If you want to populate certain fields/property
const findTweet = async() => {
    cosnt t = await tweet.findOne({}).populate('user', 'username') // populate user field with just username value instead of entire value (will still show ID)
    console.log(t)
}
```

- Now the question comes down to: **which approach is better?**
    - Should we do reference from **parent to child**, **child to parent** or both?
- It comes down to what you're doing. It'll depend on case-by-case basis
    - Mongo/Mongoose is so flexible in that sense with what direction we want to go

## Mongo Schema Design
- https://www.mongodb.com/company/blog/mongodb/6-rules-of-thumb-for-mongodb-schema-design
- Denormalize is duplicating a field/data on both the parent and the child
    - This is a big no no in a SQL database
    - It's called **One-to-N**
- Good questions to think about when designing a schema design:
    1. How am I going to use this data?
    2. Where am I going to access it?
    3. How will I access it?
    4. What do I need frequently? 
    5. What do I need together?
- This will dictate how we structure things