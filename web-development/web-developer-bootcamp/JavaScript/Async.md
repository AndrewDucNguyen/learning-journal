# Async JavaScript
## The Call Stack
___
- How JS manages function calls
- The mechanism the JS interpreter uses to keep track of its place in a script that calls multiple functions.
- How JS "knows" what function is currently being run and what functions are called from within that function, etc.
  - How JS knows where it is
- Basic data structure
- Last In First Out

### How it works
- When a script calls a function, the **interpreter** adds it to the call stack and then starts carrying out the function.
- Any functions that are called by that function are added to the call stack further up, and run where their calls are reached.
- When the current function is finished, the interpreter takes it off the stack and resumes execution where it left off in the last code listing.
```js
const multiple = (x, y) => x * y;

const square = x => multiple(x, x);

const isRightTriangle = (a, b, c) => {
    return square(a) + square(b) === square(c)
}

isRightTriangle(3, 4, 5)
```
- Call stack:
  - isRightTriangle
  - Square
  - multiple()
- Goes through the call line-by-line

## Web API's & Single Threaded
___
- JS is single threaded
  - At any given point in time, that single JS thread is running at most one line of JS code
  - Can only do one thing at a time
  - It can switch back and forth with code, but it's still only one thing happening at one time
- Could seem problematic, but there is a workaround with that
- What happens when something takes a long time?
  - Does it come to a halt and wait?
- We have something called callbacks
```js
console.log("Hello")
setTimeout(() => {
    console.log('Here is your data')
}, 3000)
console.log('I am at the end')

/*
    Order:
    1. Hello
    2. I am at the end
    3. Here is your data
*/
```
- How does that work?
  - The browser does the work under the hood
    - It's not written in JS and does things JS can't do, and it'll hand off things to the browsers to take care of
- Browsers come with Web API's that are able to handle certain tasks in the background (like making requests or setTimeout)
- The JS call stack recognizes these Web API functions and passes them off to the browser to take care of
- Once the browser finishes those tasks, they return and are pushed onto the stack as a callback.
  - The function that goes into Web APIs will be thrown into callback queue where JS will pick it back up to run in the call stack
- The browser is what keeps track of the time, not JS

## Callback hell
```js
setTimeout( () => {
    document.body.style.backgroundColor = 'red'
}, 1000)

setTimeout( () => {
    document.body.style.backgroundColor = 'orange'
}, 2000)
// This is not good because it is dependent on the time of the first and if theres more then the second one also well..
// It would be nice to do 1 second after the previous

// You can nest it

setTimeout( () => {
    document.body.style.backgroundColor = 'red'
    setTimeout( () => {
        document.body.style.backgroundColor = 'orange'
        setTimeout( () => {
            document.body.style.backgroundColor = 'yellow'
            setTimeout( () => {
                document.body.style.backgroundColor = 'green'
                setTimeout( () => {
                    document.body.style.backgroundColor = 'blue'
                }, 1000)
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)
```
- This is fine, but it is getting nested
```js
const delayedColorChange = (newColor, delay) => {
    setTImeout(() => {
        document.body.style.backgroundColor = newColor
    }, delay)
}

delayedColorChange('olive', 3000);

// if I want a second one, this isn't going to work...
delayedColorChange('teal', 3000)
// You need to nest it and have it run after the previous through adjusting the function
const delayedColorChange = (newColor, delay, doNext) => {
    setTImeout(() => {
        document.body.style.backgroundColor = newColor
        doNext && doNext();
    }, delay)
}
delayedColorChange('red', 1000, () => {
    delayedColorChange('orange', 1000, () => {
        delayedColorChange('yelow', 1000, () => {
            delayedColorChange('blue', 1000, () => {
                
            })
        })
    })
});
```
- This can get messy once we get to waiting for data to come in
  - We have to account for success and failure which means we need to create two callback functions
```js
searchMoviesAPI('amadeus', () => {
    // api works
    saveToMyDB(movies, () => {
        // worked, run this
    }, () => {
        // doesn't work, run this
    })
}, () => {
    // if API doesn't work
})
```
- This is callback hell with being so nested and confusing

## Promises
___
- A `Promise` is an object representing the eventual completion or failure of an asynchronous operation
```js
const fakeRequestCallback = (url, success, failure) => {
    const delay = Math.floor(Math.random() * 4500) + 500;
    setTimeout( () => {
        if (delay > 4000) {
            failure('connection timeout')
        } else {
            success(`here is your data ${url}`)
        }
    }, delay)
}

const fakeRequestPromise = (url) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 4500) + 500;
        setTimeout( () => {
            if (delay > 4000) {
                failure('connection timeout')
            } else {
                success(`here is your data ${url}`)
            }
        }, delay)
    })
}

fakeRequestCallback(('books.com/page1'), function(response) {
    console.log('It worked')
    console.log(response) // here is your data books.com/page1
    fakeRequestCallback(('books.com/page2'), function() {
        console.log(response) // here is your data books.com/page2
    }, function() {
        // page 2 error
        console.log('Error', err) // Error connection timeout
    })
}, function(err) {
    console.log('Error', err) // Error connection timeout
})
```
- This is callback hell if we wanted to keep making request. We have to nest it within each success
  - Then came promises
