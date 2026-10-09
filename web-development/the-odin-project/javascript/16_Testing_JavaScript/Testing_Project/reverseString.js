export const reverseString = (string) => {
    return [...string].reverse().join('');
}

console.log(reverseString("Hello"))