import { capitalize } from "./capitalize";

test('Capitalize first letter of string', () => {
    expect(capitalize('hello')).toBe('Hello')
})