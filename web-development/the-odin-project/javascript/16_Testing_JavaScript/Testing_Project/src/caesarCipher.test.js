import { caesarCipher } from './caesarCipher'

test('Shift 1 for cipher', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc')
})

test('Shift 1 wtih caps', () => {
    expect(caesarCipher('XYZ', 3)).toBe('ABC')
})

test('Beware the Ides of March, 7', () => {
    expect(caesarCipher('Beware the Ides of March', 7)).toBe('Ildhyl aol Pklz vm Thyjo')
})

test('HeLLo shfit 3', () => {
    expect(caesarCipher('HeLLo', 3)).toBe('KhOOr')
})

test('Hello, World! shift 3', () => {
    expect(caesarCipher('Hello, World!', 3)).toBe('Khoor, Zruog!')
})
