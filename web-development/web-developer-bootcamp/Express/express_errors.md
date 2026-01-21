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
- Errors returned from asynchronous functions invoked by route handlers must be passed to the `next()` function

```js

app.get('/products/:id', async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)

    if (!product) {
        return new(throw next AppError('Product not found', 404)) // need return or else the code will continue running and will run the res.render which will cause an error on the server

    }
    res.render('/product/show', {product})
})

```

## Handling More Async Errors
- You have to use a `try/catch` block on async code for updating and editing methods
```js

app.post('/products', (req, res next) => {
    try {
        const newProduct = newProduct(req.body)
        await newProduct.save()
        res.redirect(`/products/${newProduct._id}`)
    } catch(e) {
        next(e)
    }
})

```

- Even with the return of `next()` and throwing an error, the code could still run into an error on the db, node, or code side. You'll still need to use a `try/catch` block for it

```js

app.get('/products/:id', async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)

    try {

        if (!product) {
            throw new AppError('Product not found', 404)
        }
        res.render('/product/show', {product})
    } catch(e) {
        next(e)
    }
})

```

## Defining an Async Utility
- It's annoying to have to add the `try/catch` block to all the async route callbacks/middlewares
    - Many routes will be async in express
- You can define a function to pass the entire callback to

```js

function wrapAsync( fn ) {
    return function(req, res, next) {
        fn(req, res, next).catch(e => next(e))
    }
}

// Instead of the previous approach shown before this section, we can wrap the async function within this utility function


app.get('/products/:id', wrapAsync(async(req, res, next) => {
    const { id } = req.params;
    const product = await Product.findById(id)

    try {

        if (!product) {
            throw new AppError('Product not found', 404)
        }
        res.render('/product/show', {product})
    } catch(e) {
        next(e)
    }
}))

```

## Differentiating Mongoose Errors
- There are many types and distinct types of errors in mongoose
- Every error has a property of name