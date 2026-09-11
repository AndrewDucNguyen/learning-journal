# Intro
- JS does not have classes in the same sense as other object-oriented languages
- Mostly resembles object constructors and prototypes
- Accessor property are functions that execute on getting and setting a value

```js
let obj = {
    get propName(){
        // getter, the code executes on getting obj.propName
    }

    set propName(value) {
        // setter, the code executes on setting obj.propName = value
    }
}
```
- The getter works when `obj.propName` is read, the setter - when it is assigned

## Basic Syntax
```js
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```
- The `constructor()` method is called automatically by `new`, so we can inintilize the object there