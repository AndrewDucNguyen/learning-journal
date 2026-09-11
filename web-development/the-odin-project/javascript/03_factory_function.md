# Factory Function
- Factory functions is just easier than object constructors due to not having to use the word `new`

## Factory functions and Module Pattern
- Closures are functions that return a function

## Scoopfuls of scopes
The word "scoping" essentially asks, "where is a certain veriable available to me?"

Types of scopes:
- Global scope
- Locally scope
- Function scope
- Block scope

```js
// This is a global variable
let globalAge = 23;

// This is a function - and hey, a curly brace indicating a block
function printAge(age) {
  // This is a function scoped variable
  var varAge = 34;

  // This is yet another curly brace, and thus a block
  if (age > 0) {
    // This is a block-scoped variable that exists
    // within its nearest enclosing block: the if's block
    const constAge = age * 2;
    console.log(constAge);
  }

  // ERROR! We tried to access a block scoped variable
  // outside its scope
  console.log(constAge);
}

printAge(globalAge);

// ERROR! We tried to access a function scoped variable
// outside the function it's defined in
console.log(varAge);

```

## Closures
You can use function to create another function

```js
function makeAddingFunction(firstNumber) {
  // firstNumber is scoped anywhere within makeAddingFunction,
  // including returnedFunction
  // any variables declared here will also be accessible within returnedFunction

  // we don't need to name the returned function
  // this is just to reference more easily in explanation
  return function returnedFunction(secondNumber) {
    // secondNumber is scoped only within returnedFunction
    return firstNumber + secondNumber;
  }
}
```

You can then create a function by calling `makeAddingFunction`:

```js
const add5 = makeAddingFunction(5);
console.log(add5(2)); // 7

const add8 = makeAddingFunction(8);
console.log(add8(2)); // 10

const add79100105110 = makeAddingFunction(79100105110);
console.log(add79100105110(111687378)); // 79211792488
```

Instead of writing a new funciton every time, we can just use a function to create a function for us. This keeps us from hardcoding the logic and resulting string every single time

## What's wrong with constructors?
- Don't provide automatic safeguards that prevent from using them wrong
- If you forget the `new` keyword, the program would fail to work with a error message that is hard to track down and understand

## Factory Functions
They're basically just functions that return objecfts

They're called factory functions because they're used in a certain way for a more specific context (like a facotry producing object)

Does not make use of prototype which incurs a performance penalty, but the penalty isn't significant unless creating thousands of objects

```js
// Constructor
function User(name) {
    this.name = name;
    this.discordName = "@" + name;
}

// Factory Function
function createUser(name) {
    const discordName = "@" + name;
    return {name, discordName};
}
```

- Prototypal inheritance
```js
function createPlayer(name, level) {
  const { getReputation, giveReputation } = createUser(name);

  const increaseLevel = () => { level++; };
  return { name, getReputation, giveReputation, increaseLevel };
}
```

- Extending methods
```js
function createPlayer(name, level) {
  const user = createUser(name);

  const increaseLevel = () => { level++; };
  return Object.assign({}, user, { increaseLevel });
}
```

## IIFEs
- Immediately Invoked Function Expression
- Functions that are called immediately
```js
// This is a function expression
() => console.log("foo");

// The function expression is now an IIFE!
// Although this one is not particularly useful of course
(() => console.log("foo"))();
```