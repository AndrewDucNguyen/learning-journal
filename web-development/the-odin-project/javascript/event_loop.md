# Event loop
- Link: https://www.youtube.com/watch?v=eiC58R16hb8

## Web APIs & Promises
- Web API's send their functions to `Task Queue`
- Promises are sent to `Microtask Queue`
- Event Loop is in charge of making sure the callstack is empty before running the queue
    - Call stack prioritizes the microtask queue

## Microtask
- A microtask can schedule another microtask