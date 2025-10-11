# Express

## Definition
* Express is a node package. It is a node framework
* Express is a fast unopinionated, minimalist web framework for Node.js. Helps build web apps
  * Has a bunch of methods and optional plugins that we can use to vuild web apps and API's

## Libraries vs Frameworks
### Library: 
- When you use a library, you are in charge. You control the flow of the application code, and you decide when to use the library
### Framework:
- With frameworks, the control is inverted. The framework is in charge, and you are merely a participant. The framework tells you where to plug in the code.

## First Express App
* Install Express by doing `npm install express`

```
const express = require("express"); // require express

const app = express() // execute express

// This will run everytime no matter what route and will show on the server not browser
app.use(() => {
  console.log('we got a request')
})

// app is listening to port and then has a callback function that runs
// This is only listening, it still needs routes to get/post
app.listen(3000, () => {
  console.log('Listening on port 3000)
})
```

## Request and Response Object
* We have access to these two parameters on every incoming request to send a response
* Response object has methods on it

## Express Routing Basics
* Respond with different content for different requests
* Taking incoming request path and matching it with a specific code

* HTTP requests can only get one response so you have to comment out `app.use`

```
/*
  if we want to make /cats => 'meow'
  /dogs => 'woof
  / => 'welcome to home page'
*/

// root route
app.get('/', (req, res) => {
  res.send('home')
})

app.get('/cats', (req, res) => {
  res.send('meow')
})

app.get('/dogs', (req, res) => {
  res.send('woof')
})
```
* Takes in two arguments, first is the path, second is the callback function
* The method you use on `app` will depend what HTTP method you use
  * `app.get` is GET 
  * `app.post` is POST

* To catch all other routes for error then use:
```
app.get('*`, (req, res) => {
  res.send('I don't know that route...')
})
```
* Order of routes matter too