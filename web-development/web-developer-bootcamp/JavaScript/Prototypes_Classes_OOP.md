# Prototpyes, Classes, and OOP

## Prototypes
___ 
- `__proto__`
    - Template object
    - This helps so we don't have to create the same method for each object, but the object can copy from a overall template
    - It will reference it, not really copy
- Mechanism by which JavaScript objects inherit features from one another.
- Objects can have a prototype object which acts as a template object
- A method might not be defined by the object, but it comes from somewhere else like the `__proto__` object
- Example would be `array.push`
    - This comes from the proto
- You can add your own method into the prototype as well
    - Its a common place that stores methods that others look to 
    - Central place of truth
- `.Proto` vs `.__proto__`
    - proto is the actual object
        - Actual prototype itself
    - __proto__ is a reference

## Object Oriented Programming
___
- Breaking things up into patterns and objects

## Factory Functions
___
```
fucntion hex(r, g, b) {
    return 'x' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

function rgb(r, g, b,) {
    return `rgb(${r}, ${g}, ${b})`
}
```
- If we want to make a object to convert back and forth without passing number all the time
    - This is where factory function comes in

```
function makeColor(r, g, b) {
    // Make object
    const color = {};
    color.r = r
    color.g = g
    color.b = b

    color.rgb = function() {
        const {r, g, b} = this
        return `rgb(${r}, ${g}, ${b})`
    }

    color.hex = function() {
        const {r, g, b} = this
        return 'x' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
    }

    // Return object at the end to use
    return color
}

const firstColor = makeColor(35, 255, 150)
firstColor.hex()
```
- This is not the main way people create object based off patterns

## Constructor Functions
___
- More commonly used
- what is the `new` keyword
    - new Promise, new Array
- Each color has rgb function or unique function
    - Theres no need for this case

```
// Make some color call with black and first color

black.hex === firstColor.hex // returns flase

"hi".slice === "bye".slice // returns true
```
- It is the same because it is defined on the prototype
    - They're pointing/referencing to a function on the prototype
- Example of constructor function
```
function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}

let car1 = new Car('Eagle', 'Talon TSi', 1993)
```
- Remaking he color function from earlier
```
function Color(r, g, b) {
    this.r = r;
    this.g = g
    this.b = b
}
```
- The `this` keyword refers to the window obect in this instance until you use the `new` keyword/operator
- This happens when the new keyword is used with the function
    - Create a blank, plain JavScript object
    - Links (sets the constructor of) 'this' object to another object
    - Passes the newly created object from Step 1 as the this context
    - Returns this if the function doesn't return its own object
- Kind of doing the same thing as earlier
- To create functions/methods inside the function you can do it on the prototype
    - This is so you only have to create the function once rather than everytime on a new funciton
    - It also is the center of truth for that specific function and you only have to change it once if you change something
```
// Wrong way
function Color(r, g, b) {
    this.r = r;
    this.g = g
    this.b = b
    this.rgb = function() {
        const {r, g, b} = this;
        return `rgb(${r}, ${g}, ${b})`
    }
}

// Correct way - this is called a constructor function for that Color function
Color.prototype.rgb = function() {
    const {r, g, b} = this;
    return `rgb(${r}, ${g}, ${b})`
}
```
- More efficent than the factory function cause it doesn't return a new object/function every time it is called
- Shouldn't use arrow functions with this because it behaves differently