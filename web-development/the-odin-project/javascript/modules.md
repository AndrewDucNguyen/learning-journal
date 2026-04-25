## Before ES6 Modules
- If we have a HTML with two js files
```html
<script src="one.js" defer></script>
<script src="two.js" defer></script>
```
- One.js:
```js
// one.js
const greeting = "Hello, Odinite!";
```
- Two.js:
```js
// two.js
console.log(greeting);
```

- If we wanted to make a variable private while keeping another variable not private, we'd have to do this:
```js
// one.js
const greeting = (() => {
  const greetingString = "Hello, Odinite!";
  const farewellString = "Bye bye, Odinite!";
  return greetingString;
})();
```
- You have to return which one you want to be public while keeping the other one non-returned

## ES6 modules
- More control over things. Each file has its own priate scope by default. We get to choose what things we export from that file and choose what to import from other files.
- Just because we export something doesn't mean it's automatically available elsewhere; it will only be available in another file if we explicitly import it


### Import and Export
- Two types of importing and exporting. They do the same thing but slightly differenlty.
    1. `default`
        - Can only default export a single thing
        - Does not have a name attached to it, so you can decide what name to give it when importing
        - Two ways to do it - inline or export at end of file
        ```js
        // one.js
        export default "Hello, Odinite!";

        // or 
        // one.js
        const greeting = "Hello, Odinite!";
        export default greeting;
        ```
        - To import:
            - You can name it whatever we want
            - Don't use curly braces which are only for named importing
        ```js
        // two.js
        import helloOdinite from "./one.js";

        console.log(helloOdinite); // "Hello, Odinite!"
        ```

    2. `named`:
        - To export as **named export**, we stick with `export` keyword in front or add an `export { }`
        ```js
        // one.js
        export const greeting = "Hello, Odinite!";
        export const farewell = "Bye bye, Odinite!";

        // or

        // one.js
        const greeting = "Hello, Odinite!";
        const farewell = "Bye bye, Odinite!";
        export { greeting, farewell };
        ```
        - To import, we have to explicitly import it
        ```js
        // two.js
        import { greeting, farewell } from "./one.js";

        console.log(greeting); // "Hello, Odinite!"
        console.log(farewell); // "Bye bye, Odinite!"
        ```
- You can use both meethods at the same time
```js
// one.js
export default "Hello, Odinite!";
export const farewell = "Bye bye, Odinite!";
```
```js
// two.js
import greeting, { farewell } from "./one.js";

console.log(greeting); // "Hello, Odinite!"
console.log(farewell); // "Bye bye, Odinite!"
```

### Entry points
- Basically use the file that isn't being called on as the script file in the html. It'll point to all the other ones and the browser will know to load them

### CommonJS
- Uses `require` and `module.exports` instead of `import` and `export`
- designed to use with Node.js