import { calculator } from './calculator'

test('Add two numbers', () => {
    expect(calculator.Add(2, 2)).toBe(4)
})

test('Subtract two numbers', () => {
    expect(calculator.Subtract(2, 2)).toBe(0)
})

test('Divide two numbers', () => {
    expect(calculator.Divide(2, 2)).toBe(1)
})

test('Multiply two numbers', () => {
    expect(calculator.Multiply(2, 2)).toBe(4)
})