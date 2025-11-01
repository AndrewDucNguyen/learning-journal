# Newer JavaScript Features
## Default Params
___
- If user passes in param then we use it, else, we have a default param
```js
function rollDie(numSides) {
    return Math.floor(Math.random() * numSides) + 1
}
```
- if they don't pass in `numSides` without a default param we'll get NaN
- prior to having default params, we have the old way
```js
function rollDie(numSides) {
    if (numSides === undefined) {
        numSides = 6
    }
    return Math.floor(Math.random() * numSides) + 1
}
```
- New way
```js
function rollDie(numSides = 6) {
    return Math.floor(Math.random() * numSides) + 1
}
```
- Need to watch for order

## Spread
### Function calls
___
- Swiss army knife in JavaScript
- Spread syntax allows an iterable such as an aray to be expanded in places where zero or more arguments 9 for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.
```js
const nums = [13, 4, 6, 132, 4321, 54, 21,7, 6, 2]

Math.max(nums) // this won't work because its expected a list of number

Math.max(...nums) // this works and wil give 4321
```
- Anything that you can iterate over with `for of` you can spread

### Array Literals
___
```js
const cats = ['blue', 'scout']
const dogs = ['arlo', 'jax']

const allPets = [...cats, ...dogs]
```
- You can also spread in strings
```js
[...'hello'] // this will be ["h", "e", "l", "l", "o"]
```

### Object literals
___
```js
const feline = { legs: 4, family: 'Felidae'}
const canine = { family: 'Caninae', furry: true }

const dog = { ...canine, isPet: true}
// { family: 'Caninae', furry: true , isPet: true}

const lion = {...feline, genus: 'Panthera'}
// { legs: 4, family: 'Felidae', genus: 'Panthera'}

const catDogs = {...feline, ...canine};
// { legs: 4, family: 'Caninae', furry: true }
```
- If you spread in an array into an object, the indexes will be the key with the number values
```js
const num = {...[2, 4, 6, 8] }
// {0: 2, 1: 4, 2: 6, 3: 8 }
```

## Rest params
- Arguments object is available inside every function
- It's an array-like object
  - Has a length property
  - Does not have array methods like push/pop
- Contains all the arguments passed to the function
- Not available inside of arrow functions
- Because it is not fully an array, this is where rest params comes in
  - collects all remaining arguments into an actual array
```js
// function sum() {
//     return arguments.reduce((total, el) => total + el)
// }
// This doesn't work because arguments does not contain the reduce method

function sum(...nums) {
    return nums.reduce((total, el) => total + el)
}
// This works
```
- Collects the rest of the params

### Destructuring Arrays
___
- A short, clean syntax to 'unpack':
  - Values from arrays
  - properties from Objects into distinct variables
- Order matters for calling the destructured element
```js
const scores = [4, 3, 2, 1]

const highScore = scores[0];
const secondHighScore = scores[1]

// This is an easier approach to assign names to the values inside the array
const [gold, silver, bronze] = scores;

const raceResults = ['Lya', 'Andrew', 'Bob', 'Salmon']

const [gold, silver, ...everyOneElse] = raceResults
/*
    gold = Lya
    silver = Anderw
    everyOneElse = ['Bob', 'Salmon']
*/
```

### Destructuring Objects
___
- This is more commonly used
```js
const users = {
    firstName: 'Andrew',
    lastName: 'Nguyen'
}

// instead of doing this
const firstName = user.firstName
const lastName = user.lastName

// Do destructuring
const {firstName, lastName} = users
```
- Order does not matter for destructuring unlike arrays
- If I want to extract/destructure the property inside the object and also rename it
  - The destructured element will be the exact name from the object properties
```js
const user = {
    born: 1930,
    died: 1978
}

const {born: birthYear, died: deathYear} = users
// This changes the born property name to birthYear and died to deathYear
```

### Destructuring Params
___
- Destructuring from the params
- Used most with objects
```js
function fullName(user){
    return `${user.firstName} ${user.lastName}`
}

// destructuring approach
function fullName(user){
    const {firstName, lastName} = user;
    return `${firstName} ${lastName}`
}

// if you don't plan to use anything else in user, then you can destruture from params
// You can destructure if you know you're expecting an object in params
function fullName({ firstName, lastName }){
    return `${firstName} ${lastName}`
}
```