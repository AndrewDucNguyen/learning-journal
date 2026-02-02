# Express Session
- Understand what they are:
    - Allows to authenticate people, keep people logged in, remember information, and goes alongside cookies

## Introduction to Sessions
- It's not very practical (or secure) to store a lot of data client-side using cookies. This is where sessinos come in.
- Sessions are a server-side data store that we use to make HTTP stateful. Instead of storing data using cookies, we store the data on the server-side and then send the browser a cookie that can be used to retrieve the data.
- Cookie cannot store a lot of information/data
- Cookies are not as secure storing information on client side 
- Information are stored on a `data store`
    - This is not the same as a database, it is completely different
    - All we need to store on the browser is just the id session
    - Could use something like Redis

## Express Sessions
- Not unique to express. Different libraries for different languages
- Install express session by doing `npm i express-session`
- Have to use it as a middleware
```js
const express = require('express')
const app = express();
const session = require('express-session')

app.use(session({
    secret: 'thisisnotagoodsecret'
}))

app.get('/viewcount', (req, res) => {
    if (req.session.count) {
        req.session.count += 1
    } else
    {
        req.session.count = 1
    }
    res.send(`You have viewed this page ${} times`)
})

app.listen(3000, () => {
    console.log('Port 3000')
})
```
- It is stored in MemoryStore by default, but it is not recommended for production use. It is meant only for debugging

## Intro to Flash
- A place in session to flash a message to a user
    - Confirmation
    - Failure
    - Etc
- Only want it happening once during the users session
- Use `connect-flash`
    - Install by doing `npm i connect-flash`
- With `flash`, middleware in place all req has `req.flash()`
```js
const flash = require('connect-flash')

app.use(session(sessionOptions))
app.use(flash()) // has to be after session

app.get('/farms', (req, res) => {
    const farms = await Farm.find({}
        res.render('farms/index', {farms, messages; req.flash('success')})
    )
})

app.post('/farms', (req, res) => {
    const farm = new Farm(req.body);
    await farm.save();
    req.flash('success', ' Successfuly made a new farm') // You have to pass this into a res.render, which can be after you post and at the redirect url
    res.redirect('/farms') 
})
```
- Inside the template for the index page, you must include it inside the ejs file

```ejs
<%= messages %> // Place this code anywhere inside the body where you would like to display the message
```

## Res.locals & Flash
- Its annoying to have to do the above with each route and rendering
- You can setup a middleware to add onto the response object and every template/view will have access to the Flash message

```js
app.use((req, res, next) => {
    res.locals.messages = req.flash(success);
    next();
})
```
- Typically, you'll want to have both an error and success message to display