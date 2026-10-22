# Mock Functions

## Link
https://jestjs.io/docs/mock-functions

## Intro
Mock functiosn allow you to test the links between code by erasing the implementation of a function, capturing calls to the function, capturing instances of constructyor functions, and allowing test-time configuration of return values

Two ways to mock functions:
1. Creating a mock function to use in test
2. Writing a `manual mock` to override a module dependency

## Using a mock function
Imagine we're testing an implementation of a function `forEach` and ivokes a callback function for each of the item in the array

```js
// forEach.js

export function forEach(items, callback) {
  for (const item of items) {
    callback(item);
  }
}
```

We can test the callback function through the use of a mock function to inspect the mock's state. This is to ensure the callback is invoked as expected

```js
//forEach.test.js

import {forEach} from './forEach';

const mockCallback = jest.fn(x => 42 + x);

test('forEach mock function', () => {
  forEach([0, 1], mockCallback);

  // The mock function was called twice
  expect(mockCallback.mock.calls).toHaveLength(2);

  // The first argument of the first call to the function was 0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // The first argument of the second call to the function was 1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

  // The return value of the first call to the function was 42
  expect(mockCallback.mock.results[0].value).toBe(42);
});
```

When Jest mock is called, Jest pushes an entry into mockCallback.mock.calls
    - Each call is an array of it's arguments
    - All calls are stored in a bigger array

This is the test after `forEach([0, 1], mockCallback);` runs, `mockCallback.mock.calls` looks like:

```js
[
  [0], // first call: mockCallback(0)
  [1]  // second call: mockCallback(1)
]
```

`expect(mockCallback.mock.calls[0][0]).toBe(0);` checks if there are 2 calls total (two inner arrays)

Breaking it down:

- `mockCallback.mock.calls[0]` is the first call, i.e. `[0]`.
- `mockCallback.mock.calls[0][0]` is the first argument of that first call => `0`.

Similarly:

- `mockCallback.mock.calls[1]` is the second call, i.e. `[1]`.
- `mockCallback.mock.calls[1][0]` is the first argument of that second call => `1`.

Another way to think about the order: [callNumer][argumentNumber]

So the two indices mean:

- First index: which call (0 = first call, 1 = second call, 2 = third, etc.)

- Second index: which argument in that call (0 = first argument, 1 = second argument, etc.)

## `.mock` property
All mock functiosn have this special `.mock` property. Data about the function and what the function returned is kept here.

`.mock` property also tracks value of `this` for each call, so it's possible to inspect that as well.

```js
const myMock1 = jest.fn();
const a = new myMock1();
console.log(myMock1.mock.instances);
// > [ <a> ]

const myMock2 = jest.fn();
const b = {};
const bound = myMock2.bind(b);
bound();
console.log(myMock2.mock.contexts);
// > [ <b> ]
```

Mock members are useful in test to assert how the functions get called, instantiated, or what they return.

```js
// The function was called exactly once
expect(someMockFunction.mock.calls).toHaveLength(1);

// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

// The second arg of the first call to the function was 'second arg'
expect(someMockFunction.mock.calls[0][1]).toBe('second arg');

// The return value of the first call to the function was 'return value'
expect(someMockFunction.mock.results[0].value).toBe('return value');

// The function was called with a certain `this` context: the `element` object.
expect(someMockFunction.mock.contexts[0]).toBe(element);

// This function was instantiated exactly twice
expect(someMockFunction.mock.instances.length).toBe(2);

// The object returned by the first instantiation of this function
// had a `name` property whose value was set to 'test'
expect(someMockFunction.mock.instances[0].name).toBe('test');

// The first argument of the last call to the function was 'test'
expect(someMockFunction.mock.lastCall[0]).toBe('test');
```

## Mock Return Values
Mock functions can be used to inject test values into the code during a test

```js
const myMock = jest.fn();
console.log(myMock());
// > undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

Mock functiosn are effective in code that uses continuation-passing style. Helps avoid the need for complicated stubs that recreate behavior of real copmonent they're standing in for, in favor of injecting values directly into the test right before they're used

```js
const filterTestFn = jest.fn();

// Make the mock return `true` for the first call,
// and `false` for the second call
filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false);

const result = [11, 12].filter(num => filterTestFn(num));

console.log(result);
// > [11]
console.log(filterTestFn.mock.calls[0][0]); // 11
console.log(filterTestFn.mock.calls[1][0]); // 12
```

Most real-world examples will involve getting ahold of the mock function on dependent component and configuring it, but the concept/technique is still the same.

Try to avoid the temptation to implement logic inside any function that is not being tested directly

## Mocking Modules
Suppose we have a class that fetches users from our API. The class uses axios to call the API then returns the data attribute which contains all the users:

```js
import axios from 'axios';

class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}

export default Users;
```

To test this method without hitting the API, we use `jest.mock(...)` function to automatically mock the axios module

Once we mock the module, we can provide a `mockResolvedValue` for `.get` that returns the data we want in our test to assert against. 

```js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);

  // or you could use the following depending on your use case:
  // axios.get.mockImplementation(() => Promise.resolve(resp))

  return Users.all().then(data => expect(data).toEqual(users));
});
```

## Mocking Partials
Subsets of a module can be mocked and the rest of the module can keep their actual implementation:

```js
// foo-bar-baz.js
export const foo = 'foo';
export const bar = () => 'bar';
export default () => 'baz';
```

```js
//test.js
import defaultExport, {bar, foo} from '../foo-bar-baz';

jest.mock('../foo-bar-baz', () => {
  const originalModule = jest.requireActual('../foo-bar-baz');

  //Mock the default export and named export 'foo'
  return {
    __esModule: true,
    ...originalModule,
    default: jest.fn(() => 'mocked baz'),
    foo: 'mocked foo',
  };
});

test('should do a partial mock', () => {
  const defaultExportResult = defaultExport();
  expect(defaultExportResult).toBe('mocked baz');
  expect(defaultExport).toHaveBeenCalled();

  expect(foo).toBe('mocked foo');
  expect(bar()).toBe('bar');
});
```

## Mock Implementations
There are cases where it's useful to go beyond the ability to specify return values and full-on replace the implementation of a mock function.

This can be done with jest.fn or the mockImplementationOnce method on mock functions.

