# Props
## Definition:
* Props are like arguments that we can provide to our components
* We use props to make configurable components

```jsx
// Greeter.jsx
export default function Greeter(props) { // we will get an argument and call it props
    console.log(props) // {person: "Bill"}
    return (
        <h1>Hi there, {proprs.person}</h1> // Hi there, Bill
    )
}
```

* You pass attributes to the component just like a HTML attribute
  * Left side is the attribute
  * Right side is the value

```jsx
//App.jsx

import Greeter from "./Greeter"
function App() {
    return (
        <div>
            <Greeter person="Bill" /> // property, will be an argument for the component
        </div>
    )
}
```

* A common thing to do with props is to destructure them
```jsx
// Greeter.jsx
export default function Greeter({person}) { // we will get an argument and call it props
    console.log(person) // Bill
    return (
        <h1>Hi there, {person}</h1> // Hi there, Bill
    )
}
```

## Non-string Props
* Use `{}` to pass in non-string type
```jsx
// App.jsx
import DieRoll from "./DieRoll"
function App() {
    return (
        <div>
            <DieRoll numSides={6} /> // property, will be an argument for the component
        </div>
    )
}

// DieRoll.jsx
export default function DieRoll({numSides}){
    return (
        <div>
            {numSides} // will show 6 as an integer not string
        </div>
    )
}
```

**stopped at setting default values**

- You can set default values within the component grabbing the props