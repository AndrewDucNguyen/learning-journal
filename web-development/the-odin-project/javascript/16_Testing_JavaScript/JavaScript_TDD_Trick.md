# JavaScript TDD Trick

## Link
https://web.archive.org/web/20260824053151/https://jrsinclair.com/articles/2016/one-weird-trick-that-will-change-the-way-you-code-forever-javascript-tdd/

## Intro
Three parts:
- Why practice TDD?
- What is TDD?
- How do you practice TDD?

## Why?
- Have you ever fixed a bug, only to find that it broke something horribly in another part of the system? And you had no idea until the client called support in a panic?
- Have you ever been afraid to touch a complicated piece of code for fear that you might break it and never be able to fix it again? … Even though you wrote it?
- Have you ever found a piece of code that you’re pretty sure wasn’t being used any more and should be deleted? But you left it there just in case?
- Have you ever felt like your code was a tower made of soft-spaghetti, held together with Clag glue and wishes?

You can go back to old code, make changes to fix bug, and know for sure that  it has been fixed while knowing that you didn't break everything through TDD.

### Excuses
Two main reasons why:

1. Testing seems like an optional extra. You don't need test to have working code. It isn't absolutely essential to getting the project completed
2. Because of the word 'test'. Testing sounds tedious, boring, and time-consuming

### Discovery
Test Driven Development is not about testing. It is a way of thinking and coding that involves test.

TDD is a technique that gives you confidence in your code. it teaches you to think about code and gives you confidence that your code definitely works

TDD doesn't slow you down. It's slower at first, but it starts saving time as you go on because you spend less time figuring out why things are broken and more time getting things done and working on code.

Spending less time bug-hunting gives you more time for everything else

TDD != Unit test. Unit tests are a type of test, TDD is a coding technique


## What?
TDD is a technique for writing code where you write a test before you write any 'proper' code.

In the book 'Test-Driven Development' by Example, Kent Beck, TDD has two simple rules that imply three simple steps:
1. Write new code only if you first have a failing automated test.
2. Eliminate duplication.

Then 3 steps follow on from the two rules:
1. Red—write a little test that doesn’t work, perhaps doesn’t even compile at first
2. Green—make the test work quickly, committing whatever sins necessary in the process
3. Refactor—eliminate all the duplication created in just getting the test to work

You write only enough code to make the test pass. No more. It takes a lot of discipline to onlu write the bare minimum code.

Doing TDD right means restraining yourself and only writing enough code to make the test pass.