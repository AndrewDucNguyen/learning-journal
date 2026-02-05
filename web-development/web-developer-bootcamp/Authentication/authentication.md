# Authentication From Scratch
- Has two parts:
    1. How does it work
    2. Implementing auth in an express app

## Authentication Vs. Authorization
- Passport is a node package for authentication
### Authentication
- Authentication is the process of verfying who a particular user is.
- We typically authenticate with a username/password combom but we can also use securtiy question, facial recognition, etc.
### Authorization
- Authorization is verifying what a specific user has access to
- Generally, we authorize after a user has been authenticated.
    > "Now that we know who you are, here is what you are allowed to do an NOT allowed to do"

## How to (not) Store Passwords
- Rule #1 Never Store Passwords
    - Even in DB (at least not directly)
- Solution: Hashing
    - Rather than storing a password in the database, we run the password through a hasing function first and then store the result in the database
    - Hashing functions are functions that map input data of some arbitary size to fixed-size output values
- Hashing always has to give the same output from the same input

## Cryptographic Hashing Functions
- Hashing functions are basically taking in abritary size input and spitting out some fixed sized output
- Password hash/safe functions
- These are characteristics we need:
    1. One-way function which is infeasible to invert
    Small
        - If someone gets access to DB and sees hash, they should not be able to reverse it and see the password
    2. Small change in input yields large change in the output
        - Should not be able to tell what letter/character is in there. Entirely changes the hash
    3. Deterministic - same input yields same output
        - Would defeat the purpose if it doesn't yeild the same output
    4. Unlikely to find 2 ouputs with same value
    5. Password Hash Functions are deliberately SLOW
        - If you have fast hash function, it'll make it easier for people to try different password to hack because its quicker

## Password Salts
- An extra safeguard
- Makes it harder to reverse engineer and guess
- Reverse lookup table
    - Hacker can make a table of all common password and their corresponding hashed password of a certain hashing function. Basically making up a table to input
- This is the solution: Salt
    - A salt is a random value added to the pasword before we hash it.
    - It helps ensure unique hashes and mitigate common attacks
- We have to konw the SALT so we can hash it back to the actual password
- Its going to be randomly generated for the salt depending on the one we use

## Intro to Bcrypt
- Theres a node and js bcrypt package
    - `bcrypt.js`
        - Written entirely in JS
        - Will run on client side as well
        - Simliar how axios could run on server and client
    - `node.bcrypt.js`
        - Does not work on browser, only on server
        - Built on c++ so its faster
```js
// npm i bcrypt and this is index.js file
const bcrypt = require('bcrypt')

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12)
    const hash = bcrypt.hash(pw, salt)
}

hashPassword('monkey')
```

- `saltRounds` = difficulty level; higher the longer it takes
- Salt is actually part of the password stored in the DB
- Once we have the hashed password with salt stored, how do we compare it and verify someones login information
    - Theres a method called `compare()`

```js
const login = async (pw, hashedPw) => {
    const result = await bcrypt.compare(pw, hashedPw)
    if (result) {
        console.log('success')
    } else {
        console.log('failed')
    }
}
login('monkey', '<HASHED_PASSWORD_FROM_DB_FROM_hasPassword>')
```
- Salt is not suppose to be really a secret, but introduces a higher security level
- You can pass the password and do the salt at the same time with `hash()`
```js
const hassPassword = async (pw) => {
    const hash = await bcrypt.hash(pw, 12);
}
```