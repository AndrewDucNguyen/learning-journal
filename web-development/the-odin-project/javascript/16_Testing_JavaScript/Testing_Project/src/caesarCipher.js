export const caesarCipher = (value, shift) => {
    const lowercaseAlphabetArray = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    const uppercaseAlphabetArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    const cipheredArray = []

    for (let i = 0; i < value.length; i++) {
        // Look in lowercase
        if (lowercaseAlphabetArray.indexOf(value[i]) != -1) {
            cipheredArray.push(lowercaseAlphabetArray[((lowercaseAlphabetArray.indexOf(value[i]) + shift) % 26)])
        } else if (uppercaseAlphabetArray.indexOf(value[i]) != -1) {
            cipheredArray.push(uppercaseAlphabetArray[((uppercaseAlphabetArray.indexOf(value[i]) + shift) % 26)])
        } else {
            cipheredArray.push(value[i])
        }
    }

    return cipheredArray.join('');
}