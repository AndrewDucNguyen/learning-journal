# Codebase Test

## Link
https://www.youtube.com/watch?v=URSWYvyc42M

## Principles of good test
Unit Test goal:
- Thorough
- Stable
- Fast
- Few

## Focus on message
Message Origin:
- Incoming
- Sent to Self
- Outgoing

## Queries vs Commands
Type:

- Query:
    - Return something/ change nothing
- Command:
    - Return nothing/ change something

## Part 1
Incoming query message: 
- Test incoming query messages by making assertions about what they send back

Another incoming query message:
- Test the interface, not the implementation

Incoming command message:
- Test incoming command messages by making assertions about direct public side effects

DRY it out:
- Receiver of incoming message has sole responsibility for asserting the result direct public side effects

## Part 2
Anti Patterns:
- Don't repeat, or be redundant, or when it doens't bring value
- Do not test private methods. Do not make assertions about their result. Do not expect to send them

Caveat:
- Break rule if it saves money during development

## Part 3 - Outgoing Query Message
Same rules as 'Sent to Self'

Anti Patterns:
- Redundant
- Over specified
- Do not test outgoing query messages. Do not make assertions about their result. Do not expect to send them

If a message has no visible side-effects, the sender should not test it

## Part 4 - Outgoing Command Message
Expect to send outgoing command messages

caveat:
- Break rule if side effects are stable and cheap

## Use Mocks
- 

## Conclusion:
Be a minimalist
Trust
Insist on simplicity
