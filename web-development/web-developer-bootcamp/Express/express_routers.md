# Express Routers & Cookies

## Express Routers
- Has a different way of writing routes built into Express.js
- You can write your routes directly within one file, but with large apps, it would be difficult organize and read
    - Not how you would want to do it with big projects
- `Router object` is an isolated instance of middleware and routes
- We can break up our routes into separate files or group them in ways to reduce duplication

```js
// Make new folder called routes

// /routes/shelters.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('all shelters')
})

router.post('/', (req, res) => {
    res.send('creating')
})

router.get('/:id', (req, res) => {
    res.send('single shelter')
})

router.get('/:id/edit', (req, res) => {
    res.send('edit shelter')
})

module.exports = router;

// index.js
const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters')

// You can prefix the routes to use the shelterRoutes so you don't have to define shelters all the time
app.use('/shelter', shelterRouters)

app.listen(3000, () => {
    console.log('listening')
})
```

## Express Router & Middleware

```js
// admin.js
const express = require('express');
const router = express.Router();

// This must be within the routes that you want and has to be router.use and not app.use or else it'll trigger for every route, even outside of this
router.use((req, res, next) => {
    if(req.query.isAdmin) {
        next()
    }
    res.send('Not admin')
})

router.get('/topsecret', (req, res) => {
    res.send('hello')
})

router.get('/deleteeverything', (req, res) => {

})

module.exports = router

// index.js
const express = require('express');
const app = express();
const shelterRouters = require('./routes/shelters')
const adminRouters - require('./routes/admin')

app.use('/shelter', shelterRouters)
app.use('/admin', adminRouters)

app.listen(3000, () => {
    console.log('listening')
})
```

## Intro to Cookies
- Cookies are little bits of information that are stored in a user's browser when browsing a particualr webiste
- Once a cookie is set, a user's browser will send the cookie on every subsequent reuqest to the site.
- Cookies allow us to make HTTP stateful
- Gives HTTP some "state"
    - HTTP is stateless

## Sending Cookies
```js
const express = require('express')
const app = express;

app.get('/greet', (req, res) => {
    res.send('Hi')
})

app.get('/setname', (req, res) => {
    res.cookie('name', 'Bob')
    res.send('Okay')
})

app.listen(3000, () => {
    console.log('Listening')
})
```

## Cookie Parser Middleware
- After sending cookies, you can pull it out from `req.cookies`, but you can't pull it out of the box with express. You need to install a package called `cookie-parser`
```js
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.get('/greet', (req, res) => {
    console.log(req.cookies) // will show the cookies stored
})
```

## Signing Cookies
- Digital signature - it is to verify its integrity and hasn't changed
- 