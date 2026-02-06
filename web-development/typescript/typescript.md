# TypeScript
## What is TypeScript
- Programming language to address shortcomings of JS
- JS with discipline
	- JS with Type Checking
- Benefits:
	- Static type: You know the type of variable before runtime. It is determinant
	- Code completion
	- Refactoring
	- Shorthand notion
- Drawback
	- Complication
	- Needs compiler: transpiration
	- Discipline in coding
## Why do we need it
- Catches error for us at runtime rather than after
## First TypeScript Program
```ts
let age: number
age = 'a' // this would give a Type error because it isn't a number
```
## Configuring the TypeScript Compiler
- Creates tsconfig.json file
```node
tsc --init
```
- Dist = Distributable
```ts
"target":"es2016" // This refers to the ECMA script version
	.
	.
	.
"module": "commonjs" //
```
## Fundamentals
- Types:
	- JS:
		- Number
		- String
		- Boolean
		- Null
		- Undefined
		- Object
	- TypeScript extends JS and has:
		- Any
		- Unknown
		- Never
		- enum
		- Tuple
### The Any Type
- Represents any kind of values
- Should avoid using this as much as possible because it defeats the purpose of having TypeScript
## Objects
```ts
let employee: {
	readonly id: number,
	name: string,
	retire: (date: Date) => void
} = {
	id: 1, 
	name: 'Andrew',
	retire: (date: Date) => {
		console.log(date)
	}
}
```
- This can get hard to read, so this is where `Type Aliases` come in
## Type Aliases
```ts
// Use Pascal Case
type Employee = {
	readonly id: number,
	name: string,
	retire: (date: Date) => void
}

let employee: Employee = {
	id: 1, 
	name: 'Andrew',
	retire: (date: Date) => {
		console.log(date)
	}
}
```
## Nullable Types
- Common source of bugs in application