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
- 
