# Middleware

## Middleware: The Key to Express
- Three distinct topics
  - The concept of middleware
  - Defining Custon Middleware
    - This is important for working with cookies, sessions, implementing authentication and keeping people logged in
  - Morgan Logging Middleware 

## Intro to Express Middleware
- Express middleware are functions that run during the request/response lifecycle
    - Parsing the body
    - Runs between the reqest and response
- Middleware
    - Middleware are just functions
    - Each middleware has access to the request and response objects
    - Middleware can end the HTTP request by sending back a response with a methods like `res.send()`
    - OR middleware can be chained together, one after another by calling `next()`

## Morgan - Logger Middleware
- Log HTTP request info to the terminal

```js
// install
npm i morgan

// file
const express = request('express')
const app = express();
const morgan = require('morgan')

// tell app to use morgan
// App.use tells express to run this code on every single request
// You're telling express to use morgan on every request and morgan will tell express to move onto the next thing whenever it is done unlike in express if you build your own, you need to tell it to move onto the next
app.use(morgan('tiny'))

app.get('/', (req, res) => {
    res.send('Home')
})

app.get('/dogs', (req, res) => {
res.send('dogs')
})

app.list(3000, () => {
    console.log('running on 3000')
})
```

## Defining Our Own Middleware
- Within a http method middleware/callback function, there is a third argument called 'next'
  - Next is recommended cause its best practice and everyone else does it. Can be something else though
  - After calling Next, it'll run the middleware first the move onto the next route that matches or next middleware

```js
app.use((req, res, next) () => {
  console.log('First middleware')
  next()
  console.log('after next in first') // This will run after everything else. It'll be at the end.
})

app.use((req, res, next) () => {
  console.log('Second middleware')
  next()
})

app.get('/', (req, res) () => {
  res.send('Home')
})

/*
  First middleware
  Second middleware
  Home
*/
```
- Important to note that it will not move on from the middle where if we do not call `next()`
- If we were to have code after next, it'll run afte everything else is ran.
  - Typically not wanted to write code right after `next()`
  - To be extra safe, you can just return next so it won't run anything after

## More Middleware Practice
- You can access the data in the middleware and modify or add onto it
- You can check if a user is authenticated
- Typically a middleware will be in their own file separate from the express and mongo file

## Setting Up a 404 Route
- You can setup middlewares to run on certain pages only

```js

app.use('/', (req, res, next) () => {
  console.lgo('Hello');
  next();
})

```

## Password Middleware Demo
- Look for a password in the url query string to make sure it matches "chickennugget"

```js

app.use((req, res, next) => {
  const password = {req.query}

  if password === 'chickennugget' {
    next();
  }
  res.send('Sorry, you need password')
}) 

```

- This is ran and protected on every single route/page

## Protecting Specific Routes
- You can pass in a middleare function inside the route parameter
  - Has to make sure the middlware has the `next()` function in it to be considered a middleware
```js

const veryifyPassword = (req, res, next) => {
  const password = {req.query}

  if password === 'chickennugget' {
    next();
  }
  res.send('Sorry, you need password')
} 

app.get('/secret', verifyPassword , (req, res) => {
  res.send('My secret')
})

```
- This is to check something on that route such as authentication or permission

## Multer Middleware 
- Express middleware to handle multipart/form-data
- Used primarily for uploading files
- Default behavior of form for multipart/form-data cannot parse the data for files