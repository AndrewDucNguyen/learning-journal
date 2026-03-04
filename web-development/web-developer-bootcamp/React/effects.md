# Effects

## Introduction
- Recap of Rendering and State
    - A state setter function is called
    - Your code finishes running
    - The component re-renders
    - In this re-render, state will be set to the new value
- Can we do something after a render or re-render?
    - We can through effects or side-effects
    - This is what effects are for - doing after (& unrelated to) a render
- This is useful for different kinds of things:
    - Changing parts of the DOM not covered by React
    - Async operations, like AJAX requests when a component is mounted
    - Doing things when a component is about to be unmounted
- Effects are used for "side-effects" - doing things unrelated to render

## The useEffect Hook
- To use an effect, register it with `useEffect(fn)`
    - You can register mySide Effect:
    ```jsx
    import React, { useEffect } from 'react';
    function MyComponent() {
        function myEffect() {
            // ... do something
        }

        useEffect(myEffect);

        // rest of component
    }
    ```
    - Common to inline these:
    ```jsx
    import React, { useEffect } from 'react';
    function MyComponent() {
        useEffect(function myEffect(){
            // ... do something
        })

        // rest of component
    }
    ```
- Example:
```jsx
import { useState, useEffect } from 'react'
export default function Counter() {
    const [count, setCount] = useState(0)

    useEffect(function myEffect() {
        console.log('Effect called')
    })

    const increment = () => {
        setCount((c) => c + 1)
    }

    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
        </div>
    )
}
```
- my effect always run after first render
- by default, my effect runs after all re-renders