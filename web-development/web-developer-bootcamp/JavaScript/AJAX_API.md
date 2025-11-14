# AJAX & API'S
## Intro to AJAX
___
- Making requests
  - XMLHTTP
  - Fetch
  - Axios
- We can make request from code and something we do often
- **AJAX:**
  - Asynchronous
  - JavaScript
  - And
  - XML
- Making request to load or send information or save on a given website/application
  - It's usually behind the scene with interacting with the DB
- It doesn't get full-blown pages such as HTML/CSS/JS, but it gets information/data
- Data as backend and APIs

## Into to API's
___
- API is just data
  - Application Programming Interface
  - Refers to any interface that a computer could interact with another computer
- Typically referring to web API's
- You expose certain endpoint that responds with certain information or code to consume
  - It returns `JSON`
  - Pure content, no styles
- You can extract the information from the data and display it inside your code
  - This is easier than displaying a whole page and better for speed and optimization

## JSON
___
- Pure data format
- Two common format:
  - XML
    - Not common anymore
    - Tags are custom kind of like HTML
  - JSON
    - Most commonly used now days
    - JavaScript Object Notation
- Format for sending data
- Consistent and 
- Key value pairs
- Every key has to be in double quotes
```json
{
  "name": "Andrew"
}
```
- Similar to JS but is different
- JSON is not just for JS. You can use it with other languages
- JSON is usually in string, you have to convert it to an object
  - Use `JSON.parse()`
- You can do the opposite with `JSON.stringify`
  - To send information to API
  - Converting object to JSON

## HTTP Verbs
___
- Verbs are what type of request you can use/send on a request
- Types
  - GET
    - Get or retrieve information
  - POST
    - Send data somewhere or post
    - Usually saved somewhere or stored on a db
  - PUT/PATCH
  - DELETE

## HTTP Status Code
___
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status
- Status codes are code that comes back from HTTP response and they usually mean something

## Understanding Query String
___
- `/people/:id/`
  - The ID changes within this api route
- You can use query string to include extra information in the link
  - HTTPS://www.amazon.com?k=bucatini&crid=3id&sprefix=bucat%2caps%2c&ref=nb_sb_noss
    - query string comes after the `?`
  - ?sort=desc&color=blue
    - Sort is descending
    - Color is blue
- You can append a query string on any api
  - It won't mess it up or anything because it doesn't raelly care about it or do anything with it if it doesn't require it
- Typically done by `?q=`

## HTTP Headers
___
- Additional way of sending information with request
- meta data/little add-on details
- Key value pairs
- Can view with dev tool
- You also get headers back with response from the server
- Some APIs require headers when the url is the same for APIs as accessing the site

## Making XHR's
___
- XMLHttpRequest
  - Old/original way of doing it
- Does not support promises, lots of callbacks
- Clunky syntax
```js
const req = new XMLHttpRequest();

req.onload = function(){
    console.log(this.responseText) // this is just text so you need to convert to JSON
    const data = JSON.parse(this.responseText)
}

req.onerror = function() {
    console.log('error')
}

req.open("GET", "https://swapi.dev/api/people/1")

req.send();
```
- Don't need to remember this because we have fetch

## Fetch
___
- Improved way of making request
  - XHR makes it difficult to make multiple request in a row
  - Fetch solves that problem
```js
fetch('https://swapi.dev/api/people/1')
    .then(res => {
    console.log(res) // will need to do .json() because it has a incomplete body to parse
    return res.json() // this returns a promise so you'll need a .then()
})
    .then(data => console.log(data))
    .catch((e) => {
    console.log(e)
})
```

- Can do async to make it even better
```js
const loadStarWarsPeople = async () => {
   try {
       const res = await fetch('https://swapi.dev/api/people/1')
       const data = await res.json();
       console.log(data)
   } catch(e) {
       console.log('error', e)
   }
}

loadStarWarsPeople();
```

## Axios
___ 
- A library for making HTTP requests
- A separate library made for http request
  - Not native
- Uses fetch behind the scene
- Works with node.js
  - Can use on client and server
```js
// Install axios and then use it 
const axios = require('axios')

// Make a request for a user with a given ID
axios.get('https://swapi.dev/api/people/1')
.then( res => {
    console.log(res) // the response object and you don't have to parse it
})
.catch(e => {
    console.log(e)
})
```
- Can use with async function too
```js
const getStarWarsPerson = async () => {
    try {
        const res = await axios.get('https://swapi.dev/api/people/1')
        console.log(res.data)
    } catch(e) {
        console.log(e)
    }
}
```
- It really just skips one extra step that fetch does

## Setting headers with axios
___
- Configuring request headers
- With fetch, you have to specify an `accept` header
- In axios, theres a second argument for `.get()`
  - Inside the second argument, theres a header object that you can modify
```
const getDadJokes = async () => {
  const config = {headers: { Accept: 'application'}}

  const res = await axios.get('https://icanhazdadjokes.com', config)

  console.log(res)
}
```