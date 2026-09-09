# Organizing Code with Objects

## Introduction
Basics of using objects is to store and retrieve data. We will go more into detail using objects and the flexibility of using objects.

## Lesson overview
- Using objects to organize data
- Using objecys to organize funcitonality
- Object methods and the `this` keyword

## Refresher

There are multiple ways to define objecys in JavaScript, but most of the time people use **object literal** syntax:

```js
const myObject = { 
    property: "Value!",
    otherProprty: 77,
    "obnoxious property": function() {
        // do stuff
    }
}
```

There are two ways to get information from an object: dot notation, and bracket notation

```js
// dot notation
console.log(myObject.property); // "Value!"

// bracket notation
console.log(myObject["obnoxious property"]); // [Function]
```