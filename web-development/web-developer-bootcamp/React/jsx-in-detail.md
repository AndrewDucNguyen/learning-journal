## Importing and Exporting Components
* Splitting code into separate file
* Put one component in one file
    * Each component get their own file
* File name is usually the same as the function/component name

### Ways to export:
1. export
```jsx
// Greeter.js
export function Greeter() {
  return <h1>Hello World!</h1>
}
```
2. export default
    1. Most common when writing react
```jsx
// Greeter.js
export default function Greeter() {
  return <h1>Hello World!</h1>
}

// OR

function Greeter() {
  return <h1>Hello World!</h1>
}

export default Greater;
```
* files don't know about other components or files without the person importing/exporting the file
* Use import and export keyword
    * You first must export the file in order to import it into another file
```jsx
// App.js
import Greeter from "./Greeter"
```
### multiple export
* If we want to export than one function from a file, you use curly braces
```jsx
function Dog() {
    return <p>Woof</p>
}

function add(x, y){
    return x + y;
}

export {Dog, add};
```
* To import, you must also use curly braces
```jsx
import {Dogs, add} from './Dog'

add(1, 2)
```
## Rules of JSX
* You must explicity close self-closing elements like `<br/>`
```jsx
// LoginForm.js

// <input> is typically okay within HTML, but because of JSX you need to explicitly closed it
// export default function LoginForm() {
//     return <input type="password"> 
// }

export default function LoginForm() {
        return <input type="password"/>
    }
```
* A component can only return a single element
  * Wrap multiple element with a generic wrapper element
```jsx
// export default function LoginForm() {
//     return <form>
//             <input type="password" />
//         </form>
// }

// can use ()

// export default function LoginForm() {
//     return (
//      <form>
//          <input type="password" />
//      </form>
//     )
// }
```

## React Fragment 
* Instead of using `<div>` and clutering the document with unecssary div or wrapper element you can you:
  * `<> </>` which is called a react fragment
  * Set of empty HTML/JSX tag
  * It satisfies the rules of JSX and only returns the children inside the fragment

## Evaluating JS Expression in JSX
* Add dynamic value in function 
  * To add something dynamic, you need to use `{}`
  * This escapes the JSX content and will be treated as pure JS
```jsx
function Dog() {
    return <p> {1 + 4} Woof</p> // this will return: 5 Woof
}
```
* You can also add in variables
```jsx
const pet = "Jax"
function Dog() {
    return <p> {pet} Woof</p> // this will return: Jax Woof
}
export default Dog;
```

## Compose react components (Component Decomposition)

