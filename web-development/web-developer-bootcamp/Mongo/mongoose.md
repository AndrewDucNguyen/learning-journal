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
- 