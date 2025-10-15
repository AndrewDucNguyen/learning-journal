# Node
* JavaScript that runs outside the browser
* Get some features that we can't do in the browser but also lose some functionality like DOM manipulation

## Intro
### What it is:
* A JavaScript runtime
* Node is a JavaScript runtime that executes code outside the browser
* Job of browser to implement rule, it was the only place before where we could run JavaScript
* Node is the implementation of running JavaScript outside the browser
  * We can run code without opening the browser
* Can use same syntax that we know on the browser to run on the server side

### What do people build with Node:
* Web Servers
  * Without Node we can write client side code to request data from server, not directly what the server does with requests
  * You couldn't make your own API or work with DB's without Node
  * Popular Node framework is Express.js
* Command Line Tools
* Native Apps
* Video Games
* Drone Software
* Etc.

### Running Node files
* Write code in JavaScript file
```js
// firstScript.js
console.log("Hello World!")

// run node firstScript.js // Should console.log: Hello World!
```

### Node process & argv
* Node has a lot of different methods that could be use, but process is a global object that provides information about, and control, over the current Node.js process
* Argv is a property that returns an array containing the command line arguments passed where the Node.js process was launched

### Node file system
* You need to require the fs module to use it unlike process methods
```js
const fs = require('fs')
```
* You don't need to download anything, its already available in scope and you just need to require it
* There's a sync and a non-sync which will make it synchronous or asynchronous
  * Will either wait for the function to complete running first before moving on or move on and come back once it finishes
* For file system stuff, it is good to have error handling such as `Try Catch`
