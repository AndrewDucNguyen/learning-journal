# Recursion and Stack

## Link
https://javascript.info/recursion

## Intro
Recursion is aprogramming pattern that is useful when a task can be naturally split into several tasks of the same kind, but simpler. Or simplifying task into easy action plus a simpler variant of same task. Or, with certain data structures

When a function solves a task, it can call many other functions in the proces or even itself. Thats called recursion

## Two ways of thinking
Write a function `pow(x, n)` that raises `x` to the natural power of `n`. Basically, multiple `x` by itself `n` times

```js
pow(2, 2) = 4
pow(2, 3) = 8
pow(2, 4) = 16
```
There are two ways to implement it

1. Iterative thinking: the `for` loop
```js
function pow(x, n) {
  let result = 1;

  // multiply result by x n times in the loop
  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

alert( pow(2, 3) ); // 8
```

2. Recursive thinking: simplify the task and call self:
```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert( pow(2, 3) ); // 8
```

These are fundamentally different. When `pow(x, n)` is called, the execution splits into two branches:

```js
              if n==1  = x
             /
pow(x, n) =
             \
              else     = x * pow(x, n - 1)
```

1. If `n == 1`, then everything is trivial. It is called the base of recursion, because it immediately produces the obvious result: `pow(x, 1)` equals `x`.
2. Otherwise, we can represent `pow(x, n)` as `x * pow(x, n - 1)`. In maths, one would write `x^n = x * x^n-1`. This is called a recursive step: we transform the task into a simpler action (multiplication by x) and a simpler call of the same task (`pow` with lower `n`). Next steps simplify it further and further until `n` reaches `1`.

We can also say that `pow` recursively calls itself until `n == 1`

Examples:
1. `pow(2, 4) = 2 * pow(2, 3)`
2. `pow(2, 3) = 2 * pow(2, 2)`
3. `pow(2, 2) = 2 * pow(2, 1)`
4. `pow(2, 1) = 2`

Recursion reduces a function call to a simpler one until the result becomes obvious.

### Recursion is usually shorter
A recursive solution is usually shorter than an iterative one

We can clean up the recursive code even more by replacing the `if` with `?`

```js
function pow(x, n) {
  return (n == 1) ? x : (x * pow(x, n - 1));
}
```

The max number of nested calls is called recursion depth

The max recursion depth is limited by JavaScript engine to 10,000. Some engines allow more, but 100,000 is probably out of limit for the majority of them. This is automatic optimization.

## Execution context and stack
This is examining how recursive calls work. This requires us to look under the hood

Information about the process of execution of a running function is stored in its execution context

The execution context is an internal data structure that contains details about the execution of a function, such as:
    - where the control flow is now
    - the current variables
    - the value of `this`
    - other internal details

One function call has exactly one execution context associated with it

When a function makes a nested call, the following happens:
- Current function paused
- The execution context that is associated with it is stored in a data structure called execution context stack
- The nested called executes
- After it finishes, the old execution is called and retrieved from the stack, other function is resumed where it stopped

Example of that happening with `pow(2, 3)` call.

## pow(2, 3)
Beginning of call `pow(2, 3)`, execution context store variables: `x = 2, n = 3` and the execution is at line `1` of the function.
- `Context: {x: 2, n: 3, at line 1} call: pow(2, 3)`

This is when the function starts to execute. The condition of `n == 1` is falsy, so it continues the flow to the second branch `if`:

```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}

alert( pow(2, 3) );
```
Variables are the same, but the line changes and context is now:
- `Context: {x: 2, n: 3, at line 5} call: pow(2, 2)`

To calculate `x * pow(x, n - 1)`, we need to make a subcall of `pow` with new arguments in it `pow(2, 2)`

## pow(2, 2)
To do a nested call, JS remembers the current execution context in the execution context stack

Here we call the same function `pow` but it doesn't matter. The process is the same for all the functions:
1. Current context is stored/remembered on top of the stack
2. The new context is created for the subcall
3. When subcall is finished, the previous context is popped from the stack and it's execution continues

Here is the context stack when we call `pow(2, 2)`
- **`Context: {x: 2, n: 3, at line 5} call: pow(2, 2)`**
- `Context: {x: 2, n: 3, at line 1} call: pow(2, 3)`

The next context is on top and bold, and the previous stored/remembered contexts are below

When we finish the subcall, it is easy to continue/resume the previous context because it keeps both variables and exact place of code where it stopped.

To be more precise, we can say that the execution resumes "immediately after the subcall"

## pow(2, 1)
Process repeats and a new subcall is made at line `5`, now with argument `x = 2, n = 1`

A new execution context is created, and previous one is pushed on top of the stack:
- **`Context: {x: 2, n: 3, at line 5} call: pow(2, 1)`**
- `Context: {x: 2, n: 3, at line 5} call: pow(2, 2)`
- `Context: {x: 2, n: 3, at line 1} call: pow(2, 3)`

There are two old context and 1 currently running for `pow(2, 1)`

## The exit
For execution of `pow(2, 1)`, it hits the first if contion `n == 1`

```js
function pow(x, n) {
  if (n == 1) {
    return x;
  } else {
    return x * pow(x, n - 1);
  }
}
```

There are no more nested calls, so the function finishes and returns `2`. 

As the function finishes, the execution context is no longer needed, so it is removed from the memory and the previous one is restored off the top of the stack

- **`Context: {x: 2, n: 2, at line 5} call: pow(2, 2)`**
- `Context: {x: 2, n: 3, at line 5} call: pow(2, 3)`

Execution of `pow(2, 2)` is resumed with the result from the subcall `pow(2, 1)` so it is able to finish the evaluation of `x * pow(x, n - 1)` returning 4

Then previous context is restored

- **`Context: {x: 2, n: 3, at line 5} call: pow(2, 3)`**

Once it finishes, we have the result of `pow(2, 3) = 8`

The recursion depth in this case was: **3**
