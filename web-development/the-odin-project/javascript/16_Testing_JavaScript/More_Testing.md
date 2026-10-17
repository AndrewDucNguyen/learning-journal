# More Testing

## Intro
An important basic concept is that testing should be done in isolation as much as possible.

We should only test one method at a time, and your tests for one function would not depend on external functions because it would help narrow down the failure and the cause of the failure.

## Lesson Overview
- Explain what tightly coupled code is
- Describe a pure function and how it relates to TDD
- Explain what mocking is

## Pure functions
This is a tightly coupled code - this is hard to test
```js
function guessingGame() {
  const magicNumber = 22;
  const guess = prompt('guess a number between 1 and 100!');
  if (guess > magicNumber) {
    alert('YOUR GUESS IS TOO BIG');
  } else if (guess < magicNumber) {
    alert('YOUR GUESS IS TOO SMALL');
  } else if (guess == magicNumber) {
    alert('YOU DID IT! 🎉');
  } else {
    return 'INVALID INPUT';
  }
}
```

To make it testable, it is required to split up different things that are happening

```js
function evaluateGuess(magicNumber, guess) {
  if (guess > magicNumber) {
    return 'YOUR GUESS IS TOO BIG';
  } else if (guess < magicNumber) {
    return 'YOUR GUESS IS TOO SMALL';
  } else if (guess == magicNumber) {
    return 'YOU DID IT! 🎉';
  } else {
    return 'INVALID INPUT';
  }
}

function guessingGame() {
  const magicNumber = 22;
  const guess = prompt('guess a number between 1 and 100!');
  const message = evaluateGuess(magicNumber, guess);
  alert(message);
}

guessingGame();
```

The only thing we really need to this in this is the `evaluateGuess` function - this is easier because it has a clear input and output. It also doesn't call and external functions

Test driven development encourages better program architecture because it encourages you to write Pure Functions

## Mocking
There are two solutions to tightly coupled code
1. Remove those dependencies from your code (though its not always possible)
2. Mocking - writing "fake" versions of a function that a;ways behaves exactly how you want

Example:
- You’re testing a function that gets information from a DOM input, you really don’t want to have to set up a webpage and dynamically insert something into the input just to run your tests. With a mock function, you could just create a fake version of the input-grabbing function that always returns a specific value and use THAT in your test.
