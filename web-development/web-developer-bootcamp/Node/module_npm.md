# Module and NPM
## Working with module.exports
* Sharing JS code between different files
* You usually include it within the HTML files assuming we include it in the right order
* With node, it is different cause we can share between specific files only
  ```js
    // math.js
    const add = (x, y) => x + y

    const PI = 3.15169;

    const square = x => x*x

    module.exports.add = add
    module.exports.PI = PI
    module.exports.square = square

     // this is an object by default or you can do this other approach

     const math = {
        add: add,
        PI: PI,
        square: square
     }
     module.exports = math

     // or

    exports.square = square;
    exports.PI = PI


    // app.js
    const math = require('./math')
    console.log(math) // will show all the functions from math.js file
  ```

## Requiring a directory
