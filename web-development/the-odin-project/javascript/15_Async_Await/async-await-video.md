# DotJS 2017 Async + Await

## Link
https://www.youtube.com/watch?v=9YkUCxvaLEk

## Notes
Promises are like an IOU for something that is going to happen at some point in the future:

- Ajax call returning data
- access to a user's webcam

All these things take time and JS waits for nobody because its asynchronous. Promises lets you work with asynchronous code where it'll return a promise (not the data) with the data to come and move on

`promise.all` waits for all the promises to finish before returning the data for all

`.then()` is still kind of callbackie

```js
const getDetails = async function() {
    // Fire both fetch
    const wesPromise = axios.get('https://api.github.com/users/wesbos');
    const scottPromise = axios.get('https://api.github.com/users/scott');

    // wait for both to come back
    const [wes,. scott] = await Promise.all([wesPromise, scottPromise]);
}
```

`try...catch` to handle errors if you want it to catch everything

You can also chain on a `.catch()` after you call the funciton to handle the error specifically

```js
async funciton loadData() {
    const wes = await axios.get('...');
}

loadData.catch(dealWithErrors);
```

Node will make the app crash if we don't have a way to handle unhandled rejections/errors

## Knowledge check

What does `async` keyword do?
- Turns a regular function to an asynchronous function, which returns a promise

What does the `await` keyword do?
- Waits for and returns the value/data for the promise that is assigned to a variable.

 What is returned from an `async` function?
- A promise

What happens when an error is thrown inside an `async` function?
- Throws an error

How can you handle errors inside an `async` function?
- `try...catch`, `.catch()` at the end of the function or when you make the function call