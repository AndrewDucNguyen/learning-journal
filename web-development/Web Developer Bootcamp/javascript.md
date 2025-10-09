# Array Methods

## Push, Pop, Shift, Unshift
* Push will add an item at the end of an array
* Pop will remove the last item of the array
* Shift will remove the first item of the array
* Unshift will add an item to the beginning of the array

## concat
* merge arrays
* Adding two arrays together to form a new array (merged)
```jsx
const array1 = ['a', 'b', 'c']
const array2  = ['d', 'e', 'f']
const array3 = array1.concat(array2)

console.log(array3)
// output: Array ['a', 'b', 'c', 'd', 'e', 'f']
```

## includes
* look for a value
* Boolean method (returns true or false)
* Tells if an array includes a particular value
```jsx
const array1 = ['a', 'b', 'c']
array.includes('a') // true
```

## indexOf
* Just like string.indexOf
* Gives the first match that comes from array

```jsx
const array1 = ['a', 'b', 'c']
array.indexOf('a') // 0
```

## join
* creates a string from an array

## reverse
* Reverses an array
* Changes the original array (destructive)
* Doesn't need an argument in the parenthesis

## slice
* copies a portion on an array

## splice
* removes/replaces elements

## sort
* sorts an array