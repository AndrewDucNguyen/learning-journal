# Promise execution
- Links: 
    - https://www.youtube.com/watch?v=Xs1EMmBLpn4
    - https://javascript.info/promise-basics

The function passed to `new Promise` is called the executor
    - Whenever a new promise is created, the executor runs automatically
    - This contains code that eventually produce the result

The executor obtains the result and should call one of these call backs:
- `resolve(value)`: If the job is finished successfully, with result `value`
- `reject(error)`: If an error has occurred, `error` is the error object

The `promise` object returned by `new Promise` constructor has these internal properties:
- `state`: initially it is `pending` then changes to either `fulfilled` when `resolved` is called, or `rejected` when `reject` is called
- `result`: initially `undefined`, then changes to `value` when `resolve(value)` is called or `error` when `reject(error)` is called

Executor should perform a job, usually something that takes time, and then call `resolve` or `reject` to change the state of the corresponding promise object.

A promise that is either resolved or rejected is called "settled", as opposed to "pending" promise initially.