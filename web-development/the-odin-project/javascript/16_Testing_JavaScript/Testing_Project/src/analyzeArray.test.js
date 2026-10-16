import { analyzeArray } from "./analyzeArray";

test('To have average property', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('average')
})

test('To have min property', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('min')
})

test('To have max property', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('max')
})

test('To have length property', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('length')
})

test('To return length', () => {
    const object = analyzeArray([1, 2, 3])
    expect(object).toHaveLength(3)
})

test('To return average', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('average', 4)
})

test('To return min', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('min', 1)
})

test('To return max', () => {
    const object = analyzeArray([1, 8, 3, 4, 2, 6])
    expect(object).toHaveProperty('max', 8)
})
