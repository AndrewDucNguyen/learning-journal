## Style Guides
- Consistent set of style rules for thigns such as:
    - Indentation
    - Preferred quote style
    - General code structure
- These makes your code more maintainable and easier to read
- None are "right" or "wrong", only that they enforce somethign to promote consistency accross a codebase
- This is formatting, organizing, and composing code.

## Linting
- Linters are tools that will scan your code with a set of style rules and will report any errors to you that they find
    - They acould even auto-fix the errors in some cases
- Most common one for JS is ESLint
    - ESLint is installed as a dev dependency in projects. This allows you to run checks on any files via the command line
- You'll typically look at docs for these configurations

## Formatter
- Simliar to linters but serves a slightly different function
- Formatters take JS code and the automatically format it according to a set of rules
    - Linters look for style errors
    - Formatters target the layout of the code, such as spaces, indentation levels, and line-breaks
- Prettier is the most popular choice that is highly opinionated
    - This is installed as a dev dependency

## ESLint
- ESLint is wrapped aroudn two other open source projects
    1. Espree: Creates an Abstract Syntax Tree (AST)from JS code
    2. AST ESLint uses Estraverse: Provides traversal functions for an AST
        - During the traversal, ESLINT emits an event for reach visited node where the node type is the Event name
- ESLint rules are just functions subscribing to node types it wants to check

### AST
- Abstract representation of your code structure
    - This is defined by the ESTree project
- Every entry in teh AST is a node object, consisting of a 'type' property and a SourceLocation Object
    - Type property is a string representing the different Node variants in the AST
    - SourceLocation Object consists of a start and end property
    - This provides us with informatoin about the structure of our code
- Generally JS AST consists of Statements Expressions and Declartions (ES5)