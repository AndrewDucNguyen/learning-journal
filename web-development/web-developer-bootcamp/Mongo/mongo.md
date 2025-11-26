# Mongo DB

## Intro to Databases
- We will be using mongo
    - A way to save data and persist

### Why use a database?
- Databases can handle large amounts of data efficiently and store it compactly 
- They provide tools for easy insertion, querying, and updating of data
- They generally offer security features and control over access to data
- They generally scale well

### SQL vs NoSQL Databases
- SQL
    - structured query language
    - Relational database
        - pattern and table 
- NOSQL
    - Doesn't use sql
    - Very diverse
    - Different ways to store data
    - Don't have to split up to tables
    - No need to make schemas
    - More flexibility and freedom

## Why we're learning Mongo
- Mongo is very commonly used with Node and Express (MEAN & MERN stacks)
- It's easy to get started with
It plays particularly well with JavaScript
Its popularity also means there is a strong community of developers using Mongo
- Document database
    - We don't have to learn anything new
- To use the mongo db shell in the terminal you have to use `mongosh`

## Mongo DB Shell
- Theres a lot of stuff you can do in the shell
    - Change db
    - Security
    - Administration
- To get help: `help`
- Basically a JavaScript shell
    - You can run js syntax
- You have seperate DB or multiple DB at once
    - Typically each application have a separate db
- By default, the mongodb will be test when you open it up
- To show all DBs:
    - `show dbs`
- To show the db you're currently on:
    - `db`
- To change/create db 
    - `use <db name>`
    - If the db doesn't ecist, it'll create you a new one and change it
    - It will not show up in the db show list if it is empty

## What is BSON?
- Simliar to JSON
- The problem with JSON is that it is slow since it is text base format and not space efficient
    - Can't compress and make smaller
    - Does not support bunch of data type
- Binary JSON
    - More compact version of JSON
    - Mongo will store it as binary
    - Includes different data types

## Inserting with Mongo
- To insert in Mongo you have to insert into a collection
    - If you insert into a collection that doesn't yet exist, it'll create one for you
```node
    db.collection.insertOne() // Insert a single document into a collection
    db.collection.insertMany() // Inserts multiple document
    db.collection.insert() //
```