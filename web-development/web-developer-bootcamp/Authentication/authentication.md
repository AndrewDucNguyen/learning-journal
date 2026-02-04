# Authentication From Scratch
- Has two parts:
    1. How does it work
    2. Implementing auth in an express app

## Authentication Vs. Authorization
- Passport is a node package for authentication
### Authentication
- Authentication is the process of verfying who a particular user is.
- We typically authenticate with a username/password combom but we can also use securtiy question, facial recognition, etc.
### Authorization
- Authorization is verifying what a specific user has access to
- Generally, we authorize after a user has been authenticated.
    > "Now that we know who you are, here is what you are allowed to do an NOT allowed to do"

## How to (not) Store Passwords
- Rule #1 Never Store Passwords
    - Even in DB (at least not directly)
- Solution: Hashing
    - Rather than storing a password in the database, we run the password through a hasing function first and then store the result in the database
    - Hashing functions are functions that map input data of some arbitary size to fixed-size output values
- Hashing always has to give the same output from the same input