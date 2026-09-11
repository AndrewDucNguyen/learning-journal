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

## Objects as a data structure

There are two ways to get information from an object: dot notation, and bracket notation

```js
// dot notation
console.log(myObject.property); // "Value!"

// bracket notation
console.log(myObject["obnoxious property"]); // [Function]
```

Dot notation is cleaner and more preferred, but there will be circumstances when its not possible to use.

Using objects for certain things also makes it more organized, such as players in tic tac toe. 

You don't have to store a bunch of long and isolated variable names, but can be briefer variable names that are reasie to read and we could reuse the same name for different object with the use of namespacing.

It is also easier to pass around data.

## Objects as a design pattern

Objects aren't just powerful at storing/organizing data, its also useful for organizing functinoality

We are able to store logic and not just limited to storing data in objects. Storing logic inside an object is called **methods**

Anything can be expressed through the use of objects. The attributes or properties of a thing are expressed as porperties inside an object

```js
// Object
const car = {
  make: "Volkswagen", // properties
  model: "Golf",
  year: 2026,
  color: "blue",
  priceUSD: 40000,
};
```

The easiest way to get started creating methods to interact with your objects might be combining object literal syntax with JS `this` keyword.

```js
const car = {
  make: "Volkswagen",
  model: "Golf",
  year: 2026,
  color: "blue",
  priceUSD: 40000,

  // a method is just a function assigned to a property
  applyDiscount: function(discountPercentage) {
    const multiplier = 1 - discountPercentage / 100;
    this.priceUSD *= multiplier;
  },
  // shorthand way to add a method to an object literal
  getSummary() {
    return `${this.year} ${this.make} ${this.model} in ${this.color}, priced at $${this.priceUSD} (USD).`;
  },

  // ...any other methods...
};
```
- The `this` keyword behaves differently inside arrow functions compared to traditional function expressions.

- We may see object properties start with `_` e.g. `_someProperty`. This is purely a developer convetion that indicates the property is inteded to be "private"
- A private property is one that's only meant for internal use and not meant to be read or called outside of the objecy itself (such as helper methods)