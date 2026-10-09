import { caesarCipher } from ('./caesarCipher')

test('Shift 1 for cipher', () => {
    expect(caesarCipher('xyz', 3)).toBe('abc')
})