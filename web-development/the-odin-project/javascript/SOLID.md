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
= When you see a switch statement, its usually a violation to the open/closed principle
    - When you change the argument/type outside of the switch statement, you have to add/change the case inside the switch statement
- When you have a switch statement or a lot of if statements, you can break it out into individual classes/functions that has the logic in them
- This makes it easier to maintain 

## Liskov Substitution
- Most important principle for writing OOP code
- If you have a class defined somewhere in your code and another class is extending it - you should be able to replace that class with the subclass and it should work fine
- This could get messy, so we should look to compisition

### Composition vs Inheritance
- Composition:
```js
function swimmer ({ name }) {
    return {
        swim: () => console.log(`${name} swam`)
    }
}

function swimmingMonsterCreator(name) {
    const monster = { name: name }

    return {
        ...monster,
        ..swimmer(monster)
    }
}

const obj = swimmingMonsterCreator('Monster')
obj.swim()
```
- Composition is all function, no classes. Super flexible and not stuck with classes and extension

## Interface Segregation
- Theres no actual interface inside JavaScript
- You achieve the interface inside JavaScript with classes
```js
class Entity {
    constructor(name, attackDamage, health) {
        this.name = name;
        this.attackDamage = attackDamage;
        this.health = health;
    }

    move() {
        console.log(`${this.name} moved`)
    }

    attack(targetEntity) {
        // Attack logic..
    }

    takeDamage(amount) {
        // Damage logic...
    }
}

class Character extends Entity {

}

class Wall extends Entity {
    constructor(name, health) {
        super(name, 0, health)
    }

    move() {
        return null
    }

    attack() {
        return null
    }
}
```
- Theres a problem because some of the class extending entity doesn't use everything
- We solve this by breaking apart the entity class to smaller components

## Dependency Inversion
- Instead of a store directly calling the Stripe API and making it harder to change down the road, you make a middleware or a payment processor in the middle that the store and stripe API talks to
- Adapter or façade pattern