# Array Methods

## Push, Pop, Shift, Unshift
___
* Push will add an item at the end of an array
* Pop will remove the last item of the array
* Shift will remove the first item of the array
* Unshift will add an item to the beginning of the array

## concat
___
* merge arrays
* Adding two arrays together to form a new array (merged)
```jsx
const array1 = ['a', 'b', 'c']
const array2  = ['d', 'e', 'f']
const array3 = array1.concat(array2)

console.log(array3)
// output: Array ['a', 'b', 'c', 'd', 'e', 'f']
```

## includes
___
* look for a value
* Boolean method (returns true or false)
* Tells if an array includes a particular value
```jsx
const array1 = ['a', 'b', 'c']
array.includes('a') // true
```

## indexOf
___
* Just like string.indexOf
* Gives the first match that comes from array

```jsx
const array1 = ['a', 'b', 'c']
array.indexOf('a') // 0
```

## join
___
* creates a string from an array

## reverse
___
* Reverses an array
* Changes the original array (destructive)
* Doesn't need an argument in the parenthesis

## slice
___
* copies a portion on an array

## splice
___
* removes/replaces elements

## sort
___
* sorts an array

## Functions
___
- Important things to understand:
    - Working with arguments
    - Function Return Values
    - Defining Functions
- Functions are just reusable wrap of code with a name assigned to it to be used
  - Allows us to write reusable, modular code
  - Define a chunk of code that can be executed at a later time
- 2-step process
  - Define
    - Conventionally camel case
```js
function funcName() {
    // do something
}
```
  - Run
    - Will only run when we call it
    - Usually called after the function is created/defined
```js
funcName(); // run once
```

## Function Scope

### Block Scope
```js
let radius = 8;
if (radius > 0) {
    const PI = 3.124;
    let msg = 'Hi'
}
console.log(radius)
console.log(PI) // Can't access PI because it is in a different block (block scope)
```
- A block is typically any curly braces
- This is similar to a function scope, but is typically with loops or conditional loops

### Lexical Scope
```js
function bankRobbery() {
    const heros = ['Spinderman', 'Wolverine', ' Black Panther']
    function cryForHelp() {
        for (let hero of heros) {
            console.log(`Help ${hero.toUpperCase()}`)
        }
    }
    cryForHelp() // the function has access to heros. Any children nested in a parent has access to parent variables
}
```

### Function Expression
- Different way of defining a function
```js
// function statement
function add(x, y) {
    return x + y
}

// function express - you store a function to a variable name
const square = function (num) {
    return num * num
}
```
- Behaves the same way whenever we call them

### Methods (function and objects and how they work together)
- Add functions as properties on objects which is called methods
```js
const math = {
    multiple: function (x, y) {
        return x * y;
    },
    divide: function (x, y) {
        return x / y;
    },
    square : function (x) {
        return x * x;
    }
}
math.multiple(2, 2) // returns 4
```
- Every method is a function, but not every function is a method
- Shorthand approach:
```js
const math = {
    add(x, y) {
        return x * y
    },
    dvide(x, y) {
        return x / y
    },
    // etc... 
}
```

### Keyword 'this'
___
- Access other properties on the same object
- Used inside an object for a method
```js
const cat = {
    name: 'Cat',
    color: 'blue',
    breed: 'Fold',
    meow() {
        console.log('Meow')
    }
}
```
- The 'this' keyboard refers to the methods inside the cat object
  - To access things such as name, color, or breed inside the `meow` method
  - It has access to the data inside the object
- To make meow method access the name
  - You can't just access it with `name`, `breed`, or etc because it'll give a undefined error
```js
const cat = {
    name: 'Cat',
    color: 'blue',
    breed: 'Fold',
    meow() {
        console.log(`${name} says Meow`) // this will work and says: Cat says meow
    }
}
```
- The value of `this` depends on the invocation context of the function it is used in
  - It depends on how we actually call the function...
```js
const cat = {
    name: 'Cat',
    color: 'blue',
    breed: 'Fold',
    meow() {
        console.log('Meow')
    }
}

const meow2 = cat.meow; // reference to the thing. This is a function

meow2() // says meow, it returns a empty name because of the invocation and does not have access to name
```
- The invocation for meow2 does not have a invocation because of the meow doesn't have a `.meow` to the left
  - It does not refer to the cat object, but rather it refers to the window object
  - window is the top leve object and the default for the value `this`
```js
const hen = {
    name: 'Helen',
    eggCount: 0,
    layAnEgg() {
        this.eggCount += 1;
        return 'EGG'
    }
}
```

## Callbacks and Array methods

### forEach
___
- Accepts a callback function
- Calls the function once per element in the array
```js
const num = [9, 8, 7, 6, 5, 4, 3, 2, 1]

nums.forEach(function(n) {
    console.log(n + 1)
    // prints 10, 9, 8, 7, 6, 5, 4, 3, 2, 1
})
```
- A callback is a function that you pass into another function as an argument
- forEach is not as commonly used as forOf

### Map
___
- Creates a new array with the results of calling a callback on every element in the array
- Map an array state to another state
```js
const text = ['rolf', 'lol', 'omg', 'ttyl']
const caps = texts.map(function(t) {
    return t.toUpperCase();
})
text; // ['rolf', 'lol', 'omg', 'ttyl']
caps; // ['ROLF', 'LOL', 'OMG', 'TTYL']
```
- Doesn't mutate but changes the number so you can store in new variable
```js
const firstNames = fullNames.map(function(name){
    return name.first;
})
```

### Arrow Functions
___
- Newer syntax for defining functions, more compacted but still does the same thing with creating functions
```js
const square = (x) => {
    return x * x
}
```
- It creates function expressions
```js
// instead of this
const add = function(x, y){
    return x + y
}

// do this
const add = (x, y) => {
    return x + y
}
```
- Can't exist on its own, has to be given name

### Arrow Functions Implicit return
___
- Can leave off `return` keyword only with arrow functions
```js
const rollDie = () => {
    return Math.floor(Math.random() * 6) + 1
}

// or
const rollDie = () => (
    Math.floor(Math.random() * 6) + 1
)

// or
const rollDie = () => Math.floor(Math.random() * 6) + 1
```
- Only works if there is only one value/statement/expression in the body


### Filter
___
- Creates a new array with all elements that pass the test implemented by the provided function
```js
const nums = [9, 8, 7, 6, 5, 4, 3, 2, 1];
const odd = nums.filter( n => {
    return n % 2 === 1
}) // This callback returns true or false 
    // if returns true, n is added to the filtered array, else it will skill over it
    // [1, 3, 5, 7, 9] 

const smallNums = nums.filter(n => n < 5) // [4, 3, 2, 1]

```
- Callback function needs to be a boolean function where it returns true or false to check the array against

### Some & Every
___
- These are boolean methods
  - This means that it returns true or false
- Some returns true if ANY of the array elements pass the test function
- Every returns true if EVERY item of the array element pass the test function
- These do not return new arrays

### Reducer
___ 
- Executes a reducer function on each element of the array, resulting in a single value
- Take some array and reduce it down to a single value
  - How it does that is up to us
```js
[3, 5, 7, 9, 11].reduce((acc, curr) => {
    return acc + curr // this will add all the numbers in the array together
})
```
- To find the max/min of an array
```js
const minPrice = prices.reduce((min, price) => {
    if( price < min ) {
        return price
    }
    return min
})
```
- You can specify a initial starting point
  - It's the second parameter/argument which is the initial value
```js
const evens = [2, 4, 6, 8]

evens.reduce((sum, num) => {
    return sum + num
}, 100) // the sum of the array + 100 
```
### Arrow function & this
- The `this` keyword functions differently inside a arrow function vs a non-arrow function
```js
const person = {
    firstNae: 'Viggo',
    lastName: 'Mortensen',
    fullName: function(){
        return `${firstName} ${lastName}`
    }
}
```
- This in an arrow function refers to the scope it was created in
- Traditional function the `this` keyword doesn't worry about the scope of where it was created but how the function was executed