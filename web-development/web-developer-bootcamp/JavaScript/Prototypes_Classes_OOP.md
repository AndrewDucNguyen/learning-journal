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
- 