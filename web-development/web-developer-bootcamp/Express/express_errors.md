# Handling Errors in Express Apps

## Express' Built-in Error Handler
- Need to know middleware before working with errors
- Responds with default 500 error status code with a stack trace

## Defining Custom Error Handlers
- You can define error inside a middleware function 
- You have to define this error one last after all the other `app.use()`
```js

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
})

```
- If we want the error middleware to run the next middleware, then we have to pass it inside the `next()` function

```js
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke')
    next() // if we do it, it'll run the next non-error handling middleware
    next(err) // This will run the next error handling middleware
})
```

## Custom Error Class
- Generally will provide error status code so users will know what the issue is
- Generic is 400 error code
- Different meaning to status codes
- People generally setup a generic error function

```js

appError('Password required', 401)

// Create appError.js file

Class AppError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status = status;
    }
}

module.exports = AppError;

// Require app error in index.js
const AppError = require('./AppError');

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if (password === 'chickennugget') {
        next();
    }

    throw new AppError('Password required', 401)
}


app.use((err, req, res, next) => {
    const {status = 500, message = 'Something went wrong'} = err;
    res.status(status).send(message);
})
```

## Handling Async Errors