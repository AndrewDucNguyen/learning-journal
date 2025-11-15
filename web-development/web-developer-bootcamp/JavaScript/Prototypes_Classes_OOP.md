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
