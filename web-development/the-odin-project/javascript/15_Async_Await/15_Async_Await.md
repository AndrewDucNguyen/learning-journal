# Async Await

## Introduction
`async` and `await` are two keywords that can help my asynchronous code read more like synchronous code.

These two examples do the same exact thing - get information from a server, process it, and return a promise.

```js
function getPersonsInfo(name) {
  return server.getPeople().then(people => {
    return people.find(person => { return person.name === name });
  });
}
```

```js
async function getPersonsInfo(name) {
  const people = await server.getPeople();
  const person = people.find(person => { return person.name === name });
  return person;
}
```

Important to note that you have to use the keyword `async` before the function, and `await` before the `server.getPeople()`


## Lesson overview
What we will learn in this lesson:
- Explain how you declare an async function.
- Explain what the `async` keyword does.
- Explain what the `await` keyword does.
- Explain what an `async` function returns.
- Explain what happens when an error is throwm inside an `async` function.
- Explain how you can handle errors inside an `async` funciton.

## The Async keyword
The `async` keyword is what lets JavaScript know that you're declaring an asynchronous function. It'll automatically return a `promise` - this is the same as resolving a promise.

Using `async`, you are required to use `await` inside any function.

`Async` functions are just syntactical sugar for `promises`

## The Await keyword
`await` tells JavaScript to wait for an asynchronous action to finish before continuing the function. Basically "pause until done".

The `await` keyword is used to get a value from a function where you normally would use `.then()`

Instead of calling `.then()` after the asynchronous function, you would assign a variable to the result using `await`

## Error handling
Handling errors in `async` is easy. Proimses have the `catch()` method for handling rejected promises, and since async functions just return a promise, you can call the function, and append a `.catch()` method to the end.

```js
asyncFunctionCall().catch(err => {
  console.error(err)
});
```

But theres another way we could do it with `try..catch` statement. If you want to handle the error directly inside the async function, you can use `try...catch` with `async/await`. If JavaScript throws an error in the `try` block, the `catch` code block will run instead.

```js
async function getPersonsInfo(name) {
  try {
    const people = await server.getPeople();
    const person = people.find(person => { return person.name === name });
    return person;
  } catch (error) {
    // Handle the error any way you'd like
  }
}
```

It may look messy, but it is better to handling the errors without appending `.catch()` after the function call. it is entirely up to our personal preference which method to use.

`Async/Await` are just promises written in a different way