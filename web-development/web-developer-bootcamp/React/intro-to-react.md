# Intro to React

## Things to consider:
* Make sure you're comfortable with vanilla JavaScript

## How React works:
* You make reusable components
* Everything is broken into smaller components, then put together to build a bigger component
* React is more of a eco-system than just a library
* Includes webpack and babel 

## React Folder Structure
### Public Folder:
* Public folder is where the index.html lives and the entry point for the react app
* All content will be rendered in there
### Src Folder:
* Where you write all react code and components
* Style sheets

## Package.json
* React-scripts: depends on webpack, babel
* Dependency lives in here 

## Components
* Components combine HTML, CSS and logic (JS) into a single reusable function
* Write JS functions that "know" how to render themselves into HTML
* Even though it looks like HTML its not. React uses something called JSX
  * JSX is a syntax extension for JavaScript (JavaAcript Syntax Xtension)
  * Allows us to write markup that looks like HTML directly inside JS
  * It's not "legal" on its own, so it must be transpiled
* Babel is a transpiler that takes JSX to make react javascript

## Basic React Application Structure
* Needs a component called App. It is the highest level component
* Index.js is the "magic" that puts the app.js into the document
  * Usually leave the index.js file alone and only work through App.js

## React Component
* Function that returns JSX (doesn't have to be JSX but you should or else there will be issue)
  * This turns into JS after compling
* Component function should be uppercase
```jsx
function Header() {
    return (
        <div>Hello World!</div>
    )
}
```
* This doesn't call it, you still need to call it to render
* You can call as many times are you would like
```jsx
export default function App() {
    return(
        <div className="App">
          <Greater />
        </div>
    );
}
```