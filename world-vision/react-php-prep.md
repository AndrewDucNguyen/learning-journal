# React Prep

## Component lifecycle
- Lifecycle lives on the client side mostly
- In react when we work with components, they're just js functions
    - React is built off of components
    - Functional components
- Will execute functions in the lifecycles
    - Can have hooks inside components
        - useState
        - useEffect
        - etc.
    - Return jsx from function
- Client Level Lifecycle:
    - Each function will run through one of these lifecycle
    - Has 3:
        - Initial Render (mount)
            - When component mounts for first time or never been used
            - Run all code inside function body
            - Initialize all values (useState, useMemo, const, var, etc.)
            - Run/return the JSX
                - Will be passed to the virtual DOM
                - Will only update/change what needs to be changed
            - After initializing to the browser, React will schedule all remaining hooks to run (useEffect) (side effect)

        - Update (re-render)
            - When something changes in the component or something happens, the component will need to re-render
            - Mostly the same as first step
                - Run all code inside function body
                - Update all values (any value that needs updating)
                - Run/return the JSX
                - After the update to the browser, React will schedule all remaining hooks to run
        - Exit (unmount)
            - Releasing all values from memory (useState, useMemo, const, var, etc.)
            - Runs cleanup functions (useEffect)
- Server Level Lifecycle:
    - No hooks
    - Will be ran once on server
    - JSX will be returned as HTML
    - React will send straight to browser and update what user sees
    - Can have async component on server

## State vs Props
### Props
- How you pass data from parent to child component
- Read only
- Immutable (can't modify)
- Flow one direction: parent -> child
### State
- Data that a component manages internally
- When state changes, component re-renders
- Mutable
- Private
### Common questions
- When to use state or props
    - Use props when data comes from outside the component
    - Use state when the component needs to track changing data internally
- Can you pass state as props
    - Yes, state in a parent can be passed as props to children
    - This is how data flows down the component tree
- Why are props read only?
    - To maintain unidriectional data flow
    - Makes components preditable and easier to debug

## useEffect
- This is a react hook that lets you perform side effects in functional components
    - A side effect is anything that reaches outside your components
    - Things that are not just calculating and returning jsx
    - Common side effects:
        - Fetching data from API
        - Setting up subscriptions
        - Manually changing DOM
        - Setting timers
        - logging
        - Reading from localStorage
- useEffect rns after render, not during

### Dependency array
- This tells React when to re-run your effect
- Its the second argument in the useEffect

## useMemo / useCallback
- Optimization hooks
- useMemo
    - memoizes a VALUE
    - caches the result of an expensive calclation so you don't have to recompute it on every render
- useCallback
    - memoizes a FUNCTION
    - caches the function itself so it maintaiins the same reference across renders
- Key points:
    - Don't use these everywhere, they add complexity and memory
    - Use only when:
        - Calculation is expensive
        - In dependency arrays of useEffect
        - Passing to memo() wrapped components
    - Modern react has compiler that can auto-memoize for you

## Context API / Redux

### Context
- Built in React
- Lets you pass data through component without prop drilling
- Pros
    - Simple to setup
    - Great for rarely changing data
    - Simple state sharing
- Cons
    - Every context update re-renders all consumers
    - No built-in devtool
    - No middleware support
    - Can get messy

### Redux
- External state maanagement library with a centralized store and predictable state updates
- Pros:
    - Centralized state management
    - Middleware support
    - Better performance with selective subscription
    - Predictable state updates (pure reducers)
    - Great for complex state logic
- Cons:
    - More boilerplate
    - Steeper learning curve
    - More dependency to manage
    - Can be overkill for small apps

## Optimization
- Make it work, make it right, then make it fast. Always measure before optimizing

## Practice questions:
- Explain useEffect in detail and why people accidentally create infinite loops
    - 