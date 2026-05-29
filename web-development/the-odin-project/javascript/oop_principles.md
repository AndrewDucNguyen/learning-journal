# OOP Principles
- Important part is knowing how to use factory functions or modules effectively
- The basics are straightforward, but not when we need to decide what to put in each object, or when to make a new object, or when to let an object 'inherit' from another one
    - These will just be helpful guidelines, not rules

## Single Responsiblity
- A class/object/module only has one responsibility
    - Not that it can only do one thing, but that everything an object does should be part of one responsibility

## Loosely coupled objects
- To make sure that your individual objects can stand alone as much as possible
- SOLID principles
- Coupling between modules occurs when one module directly references another module. In other words, one module “knows” about another module.
    - The order and delivery modules shown are tightly coupled. For the order module to get the estimated delivery time, it has to “know” about the delivery module, and call the appropriate module’s API.
    - There are many reasons to avoid tightly coupling your modules.
    - Recall that one of the goals when creating highly scalable and maintainable JavaScript applications is that any module can be easily swapped out at any time for a different module. 
    - Reusability is also a major reason to minimize coupling. Ideally, we would like to maximize code reuse and the ability to test modules independently.
    - Another goal was that there should not be a single point of failure anywhere in the application. 
- These patterns are often a variation of the so-called observer pattern.
    - One such variation is referred to as the Pub/Sub or Publish/Subscribe pattern.