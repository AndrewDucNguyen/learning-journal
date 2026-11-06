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

Recursion depth = maximal number of context in stack

Contexts take memory. A loop-based algorithm is more memory-saving. Any recursion can be rewritten as a loop

## Recursive traversals 
Imagine we have a company:
```js
let company = {
  sales: [{
    name: 'John',
    salary: 1000
  }, {
    name: 'Alice',
    salary: 1600
  }],

  development: {
    sites: [{
      name: 'Peter',
      salary: 2000
    }, {
      name: 'Alex',
      salary: 1800
    }],

    internals: [{
      name: 'Jack',
      salary: 1300
    }]
  }
};
```

If we want a function to get the sum of all salaries, it is an iterative approach and note simple. For loops, won't work because there are nested subloops to iterate over. So we need recursion

There are two possible cases:
1. Either it’s a “simple” department with an array of people – then we can sum the salaries in a simple loop.

2. Or it’s an object with N subdepartments – then we can make N recursive calls to get the sum for each of the subdeps and combine the results.

Here is the result from that:

```js
let company = { // the same object, compressed for brevity
  sales: [{name: 'John', salary: 1000}, {name: 'Alice', salary: 1600 }],
  development: {
    sites: [{name: 'Peter', salary: 2000}, {name: 'Alex', salary: 1800 }],
    internals: [{name: 'Jack', salary: 1300}]
  }
};

// The function to do the job
function sumSalaries(department) {
  if (Array.isArray(department)) { // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else { // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

alert(sumSalaries(company)); // 7700
```

## Recursive Structures
The structure of a recursive data structure is a struxture that replicates itself in parts

### Linked List
Imagine we want to store an ordered list of objects. Naturally, we would do: `let arr = [obj1, obj2, obj3];`

But a problem with arrays is that "delete element" and "insert element" operations are expensive. `arr.unshift(obj)` or `arr.shift()` has to re-number all elements ot make room for a new `obj`. If that array is big, then it will take time.

The only operation that does not require mass-renumbering are those with the end of array: `arr.push/pop`.

Alternatively, if we need fast insertion/deletion, we can choose another data structure called **linked list**

Linked List element is recursively defined as an object with:
- `value`
- `next` referring to the next linekd list element or `null` if its the end

For example:
```js
let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};
```

or an alternative code for creation:

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;
```

We can split the list into multiple parts and join back together later

```js
let secondList = list.next.next;
list.next.next = null;
```

To join:
```js
list.next.next = secondList;
```

We can insert or remove items in any place. For instance, to prepend a new value, we nee dto update the head of the list

```js
let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };

// prepend the new value to the list
list = { value: "new item", next: list };
```

To remove value from middle, change `next` of previous one:

```js
list.next = list.next.next;
```

We made `list.next` jump over `1` to `2`. The value `1` is now excluded from the chain. If its not stored anywhere else, it'll be automatically removed from memory.

Unlike array, theres no mass renumbering, and we can easily rearranage elements.

Though there are pros, there are also cons to using a list. It cannot easily access elements by its number.

In an array, its easy: `arr[n]`, but in the list, we need to starat from the first itme and go to `next` `N` times to get the Nth element.

List can be enhanced:
- We can add property prev in addition to next to reference the previous element, to move back easily.
- We can also add a variable named tail referencing the last element of the list (and update it when adding/removing elements from the end).
- ...The data structure may vary according to our needs.


## Summary

- Recursion is a programming term that means a function calling itself. Recursive function can solve problems/tasks in an elegant way
  - When a function calls itself, that is called a recursion step

- A recursively-defined structure is a data structure that can be defined using itself
  - For instance, a linked list can be defined as a data structure consisting of an object referencing a list (or null)
  - `list = { value, next -> list }`

Any recursive function can be rewritten as an iterative one. That's sometimes requried due to cost and optimization, but it's usually fast enough and easier to write and support.
