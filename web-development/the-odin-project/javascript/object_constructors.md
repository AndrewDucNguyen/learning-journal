# Object constructors
- When you have a specific type of object that you need to make multiple of, a better way to create them is using an object constructor
```js
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}
```
- The only difference is that you use it by calling the function with the keyword `new`:
```js
const player = new Player("steve", "X");
console.log(player.name); // "steve"
```
- When we call a function with `new`:
    - it creates a new object, 
    - makes this inside the function refer to that object, 
    - and makes that object inherit from the function’s `.prototype` property
- The new object is then returned (even though we don’t specify a return value in the constructor function)
- Just like with objects created using the object literal method, you can add functions to the object:
```js
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
  this.sayName = function() {
    console.log(this.name);
  };
}

const player1 = new Player("steve", "X");
const player2 = new Player("also steve", "O");
player1.sayName(); // logs "steve"
player2.sayName(); // logs "also steve"
```
