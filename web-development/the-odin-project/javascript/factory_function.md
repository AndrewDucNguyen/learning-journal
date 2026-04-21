# Factory Function
- Factory functions is just easier than object constructors due to not having to use the word `new`

## Factory functions and Module Pattern
- Closures are functions that return a function

## What's wrong with constructors?
- Don't provide automatic safeguards that prevent from using them wrong
- If you forget the `new` keyword, the program would fail to work with a error message that is hard to track down and understand

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