# Mongoose
- Helps node/express connect to mongo

## What is Mongoose
- It is considered a driver
- It is a ODM 
    - Object Data Mapper
    - Object Document Mapper
    - ODMs like Mongoose map documents coming from a database into usable JavaScript obects
    - Mongoose provides ways for us to model out our application data and define a schema. It offers easy ways to validate data and build complex queries from the comfort of JS.
- Has a lot of functionality where you can add methods and logic

## Conecting Mongoose to Mongo
- Initial code for mongoose is to connect to a mongo db
- Mongoose supports promises
```js
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/moviesApp');
// You could use .on and .error, but try/catch or .then is the best approach
.then ( () => {
    console.log('Connection open')
})
.catch ( (error) => {
    console.log('Error', error)
})
```

## Our First Mongoose Model
- Main point of using Mongoose is having an easier way to access and manage MongoDB through JS
- Model is the main thing to understand
    - Models are just classes that we make with the assistance of Mongoose that represent information in a MongoDB or some collection
    - Think about model as the model of information/data that we are expecting to come back
- Before we define a model, we need to define a schema
    - Schema is like a blueprint/gameplan
    - A mapping of different collection key in Mongo to type in JavaScript
    - Defining a type what it'll look like
```js
// Example of what we might want from a movie
{
    title: 'Amadeus',
    year: 1986,
    score: 9.2,
    rating: 'R'
}
```
- Think about what we want the type to be
- Give specific name we'll be using later on
```js
const movieSchema = new mongoose.Schema({
    title: String,
    year: Number,
    score: Number,
    rating: String
})
```
- This has nothing to do with the DB, this is just for the JS side
- You have to tell the mongoose to make the model

```js
const Movie = mongoose.model('Movie', movieSchema)
```
- Name is important, has to be singular and uppercase
- Mongoose will take the model name and make it plural and make a db collection and make it lowercase
- You will have a class of the `Movie` schema
```js
const amadeus = new Movie({titiel: 'Amadeus', year: 1986, rating: 'R'}) // this doesn't do anything yet with the DB
amadeus.save() // this will take what we have done with data and save it to the DB
```
- `.save()` is a method available for every instance of `new Movie`

## Insert Many
- This will take time so you have to work with callbacks or promises
- Do not need to call `.save()` when using this method
- Example of code in play
```js
Movie.insertMany([
    {title: 'Amelie', year: 2001, score: 8.3, rating: 'R'}
    {title: 'Alien', year: 1979, score: 8.1, rating: 'R'}
    {title: 'The Iron Giant', year: 1999, score: 7.5, rating: 'PG'}
])
.then (data => {
    console.log(data)
})
```

## Finding With Mongoose
- Mongo Queries with a `.then()` but is not a promise
- Then-able objects

### Find
```js
// Find all, that returns query object that is thenable
Movie.find({}).then(data => console.log(data))

// Find movies where ratings are PG-13
Movie.find({rating: 'PG-13'}).then(data => console.log(data))

// Find movies where the year is greater than 2015
Movie.find({year: {$gt: 2015}}).then(data => console.log(data))
```

- `.find()` will return an array of object even if it only finds one 

### Find One
- If we want just one object then we will use `.findOne()`
```js
// Find one, that returns query object that is thenable
Movie.findOne({}).then(data => console.log(data))
```
- You are able to use callbacks with find methods
    - you pass back the callback with `function(err, docs)` or using the `.exec()` method that will  give us a full/real promise not a thenable object

### Find By ID
- If you need to take a ID from the url to find in the DB
```js
// One way
Movie.find({_id: '12345678'}).then(data => console.log(data))

// Or
Movie.findById('12345678').then(data => console.log(data))
```

## Updating with Mongoose
- Couple of options for updating like finding
- Update doesn't return the updated data/list. It just tell how many things were updated or went wrong
```js
// Update one or the first thing that matches the query
Movie.updateOne({title: 'Amadeus'}, {year: 1984}).then(res => console.log(res))

// Updating multiple movies at once
// Find first
Movie.find({title: {$in: ['Amadeus', 'Stand By Me']}})
// Update
Movie.updateMany({title: {$in: ['Amadeus', 'Stand By Me']}}, {score: 10}).then(res => console.log(res))
```
- instead of `.updateOne()` or `.updateMany()`, `.update()` could do both
- Also have `.findOneAndUpdate()` where it finds and also updates
    - You get back object with the new information instead of just a info that a n amount was updated
```js
Movie.findOneAndUpdate({title: `The Iron Giant`}, {score: 7.0}).then(res => console.log(res))
```
- You get the old object/version before it was found and updated though. This is the default behavior
    - If we want to get the new object, we have to specifcy an option as the third argument
    - `new: true` it is defaulted to `new: false`
```js
Movie.findOneAndUpdate({title: `The Iron Giant`}, {score: 7.0}).then(res => console.log(res), {new: true})
```

## Deleting with Mongo
- Similar to `.update()`, `.delete()` will not return the object. It will only return the number of modified items

```js
// Delete one
Movie.deleteOne({title: 'Amelie'}).then(res => console.log(res))

// Delete many
Movie.deleteMany({year: {$gte: 1999}}).then(res => console.log(res))

// If we want to get the data back of what was deleted
Movie.findOneAndDelete({title: 'Alien'}).then(res => console.log(res))
```

## Mongoose Schema Validation
```js
// Creating a shop/product app
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/shopApp', )
.then ( () => {
    console.log('Connection open')
})
.catch ( (error) => {
    console.log('Error', error)
})

// Short way of doing it
const productSchema = new mongoose.schema({
    name: String,
    price: Number
})

// Long way of doing it. This is good if we want additional built in validations
const productSchema = new mongoose.schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

// Use it to be a model
const Product = mongoose.model('Product', productSchema);

const bike = new Product({name: 'Mountain Bike', price: 500)
bike.save()
.then( data => {
    console.log(data)
})
.catch(err => {
    console.log('error', err)
})
```

## Additional Schema Constraints
- Default: Default value for any variable
- There are also individual constraints for specific types
- Look at documentation for other options

## Validating Mongoose Updates
- Even if you have a valdation of min on a number, you can still use the update method in mongoose to bypass that and not really have it work
- You need to tell Mongoose that we still want to apply the validation
    - The validation is only for when it is created, not updated
    - This is the case for many ORM/ODM
- You need to tell the update method to run the validators with `runValidators: true`
```js
Product.findOneAndUpdate({name : 'Tire Pump'}, {price: -19.99}, {new: true, runValidators: true})
```