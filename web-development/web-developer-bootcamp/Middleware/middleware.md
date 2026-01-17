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