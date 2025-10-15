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

## Express Path Parameter
- If we want to define a partner for a path we do dynamic routing
  - We wouldn't statically name every routing but we do:
  ```
  app.get('/r/:subreddit', (req, res) => {
    const { subreddit } = req.params
    res.send(`this is the ${subreddit} subreddit`)
  })
  ```
- If we want to match even deeper nested url such as /r/subbreddit/1234
```
  app.get('/r/:subreddit/postId', (req, res) => {
    const { subreddit, postId } = req.params
    res.send(`this is the ${subreddit} subreddit for post ID ${postId}`)
  })
```

## Working with Query Strings
- Parsing query string we don't pass it in the express route, we just grab the data from the request
```
  app.get ('/search', (req, res) => {
    // if we look up /search?q=dogs&color=red
    req.query // will have q: 'dogs, color: 'red'
  })
```
- Express parses it for you and handles the rest

# Defining RESTful Routes

## Key Points
- Difference between GET and POST then understanding PUT, PATCH, DELETE
- How to work with POST request, extract from POST request, how to get form data out
- Forms and Express how to send data through Express app and extract it
- Method Override
- Handling POST requests in Express
- RESTful routing
  - CRUD routing

## GET vs POST request
- 2 different types of HTTP request we can make
- GET
  - Used to search/retrieve information
  - Data is sent via query string when we submit data
  - Information is plainly visible in the URL
  - Limited amount of data we can send 
  - If we send data with a GET request, its filtering and not impacting behind the scene or create, update, or delete something
    - Its usualy search term, filter, sort
- POST
  - Used to post data to the server
  - Used to write/create/update
  - Won't be included in the query string but will be in the body
    - Data is sent via request body, not a query string
  - Can send any sort of data (JSON)

## Defining Express Post Routes
- Receiving request and handle POST request
  - It is undefined by default
  - Populated when you use body-parsing middleware such as `express.json()` or `express.urlencoded()`
```
const express = require('express')
const app = express();

app.use(express.urlencoded({extended: true}))

// to access data it is in the req.body once you setup a form in html with a POST request

const { meat, qty } = req.body

app.post('/tacos', (req, res) => {
  res.send()
})
```
- To get data from GET, you do req.params
- To get data from POST, you do req.body

# REST

## Definition
- Representational State Transfer
  - Architectural style for distributed hypermedia systems
- Basically a set of guidelines/rules/principles for how a client + server should communicate and perform CRUD operations on a given resource
- The main idea of REST is treating data on the server-side as resources then can be CRUDed

## RESTful comments overview
- To setup resource for a comment
```
/comments - base for everything we do 

Index - GET /comments - list all comments
New - GET /comments - Form to create new comment
Create - POST /comments - Create a new comment
Show - GET /comments/:id - Get one comment (using ID)
Edit - GET / comments/:id - Form to edit specific comment
Update - PUT/PATCH /comments/:id - Update one comment
Destroy - DELETE /comments/:id - Delete/Destroy/Remove one comment
```

```
app.get ('/comments', (req, res) => {
  res.render(comments)
})
```
- This is just one way of implementing RESTful api
- CRUD functionality blueprint

## RESTful Comments New
- When create a route for creating a new comment, you need two routes
  - One to serve the form
    - Typically */*/new route and a GET route
  - One for form to submit somewhere as a POST to send data to
  - Do not want to be the same route as the new comment form
- 302 status code is a redirect
- We usually want to do a redirect after submitting a form

```
// NEW - renders a form
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})

// CREATE - creates a new comment
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments');
})
```

## RESTful Comment Show/Detail route 
- For one specific comment or resource
- Need unique identifier (often ID)
  - To use the same identifier to get the same information/detail everytime
- People usually won't know the ID so you setup a link for people to click on to get there
- You do not want to hardcode your own ID, cause it'll be a lot of work to make sure it doesn't duplicate with anything
  - Could use a package called `UUID`

```
app.get ('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(c => c.id === parseInt(id))
  res.render('comments/show', comment)
})
```

## RESTful Comments Update
- Updating a specific resource
  - You don't want to update the ID or change specific thing
- Provide a form to edit a text or comment and then update that specific information
- You can use two different methods:
  - PUT - This method replaces all current representations of the target resource with the request payload.
    - Basically replacing a representation and overriding the previous state
  - PATCH - This method is used to apply partial modifications to a resource
    - Only changes or modify one thing inside the resource
- Usually you'll want to redirect instead of showing the content from a PATCH request
```
app.patch ('/comments/:id', (req, res) => {
  const { id } = req.params;
  const newComment = req.body.comment;
  const updatedComment = comments.find(c => c.id === parseInt(id))
  updatedComment.comment = newComment;
  res.redirect('/comments')
})
```