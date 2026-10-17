# The Values of Pure Functions

## Link
https://medium.com/@jamesjefferyuk/javascript-what-are-pure-functions-4d4d5392d49c

## What is a Pure Function?
A Pure Function has to pass two tests/requirements

1. The function always returns the same result if the same arguments are passed in. It does not depend on any state, or data, change during a program’s execution. It must only depend on its input arguments.

2. The function does not produce any observable side effects such as network requests, input and output devices, or data mutation.

## What are Observable Side Effects?
An observable side effects is an interaction with the outside world from inside the function.

This could be changing a variable that is outside the function or calling another method from within a function

**Note**: A pure function calling another pure function is not a side effect. The function is still pure

Side effects include, but are not limited to:
- Making a HTTP request
- Mutating data
- Printing to a screen or console
- DOM Query/Manipulation
- Math.random()
- Getting the current time

Not all functions should be or needs to be pure