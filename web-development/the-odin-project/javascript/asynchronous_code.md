# Asynchronous Code
- JavaScript supports functions that can happen in the background while the rest of the code executes

## Callbacks
- A callback function is a function passed into another function as an argument
  - It is invoked inside the outer function to complete some kind of routine or action
- Callbacks can get out of hand, especially when chaining several of them together
  - Functions that execute asynchronously
    - Instead of top to bottom procedurally, asunc programs may execute different functions at different times based on the order and speed that earlier functions like http requests or file system reads happen
    - Things that have to talk to hard drives or network will be asynchronous
    - Things that access memory or do some work on teh CPU will be synchronous
- Use callbacks when you don't know when some async operation will complete, but you do know where the ooperation will complete
- Talking to a hard drive is about 100,000 times slower than talking to memory

## Promises
- There are multiple ways to handle asynchronous code in JS
- Promises are one mechanism
  - Promise is an objecy that might produce a value at some point in the future
  - The issue with a promise function is that when it fetches some data from a server, it takes some time.
  - Unless we tell our code that it'll take some time, it'll assume that everything in the function happens essentially instantly
  - We solve this problem with promises.