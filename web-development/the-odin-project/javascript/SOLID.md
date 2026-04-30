# SOLID Principle

## Single Responsibility
- All classes, module, functions, anything that is inside code that can be put into a single part should have one single responsibility
    - Only one reason to change..
```js
class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories
        this.currentCalories = 0
    }

    trackCalories(calorieCount) {
        this.currentCalories += calorieCount
        if(this.currentCalories > this.maxCalories) {
            this.logCalorieSurplus()
        }
    }

    logCalorieSurplus() {
        console.log('Max caloreis exceeded')
    }
}
```

- This class has two reasons to change
    1. Track Calories
    2. Notifying user 
- We should move the log/console into its own module to have its own responsibility
    - Move it into logger.js
```js
// loggers.js
export default function logMessage(message) {
    console.log(message)
}


// script.js
import logMessage from './loggers.js'

class CalorieTracker {
    constructor(maxCalories) {
        this.maxCalories = maxCalories
        this.currentCalories = 0
    }

    trackCalories(calorieCount) {
        this.currentCalories += calorieCount
        if(this.currentCalories > this.maxCalories) {
            logMessage('Max calories exceeded')
        }
    }
}
```
- This makes it easier to follow and read
    - If not, it makes it harder to read cause too many logic and things that could make it break inside a single file

## Open/Closed Principle
- This is one of the hardest to understand
- If we change something outside of a class, function, or module, we should never have to change something inside one of those
    - Break it into seprate classes
- We don't need to always follow, but it would be great if we can