const caesarCipher = (value, shift) => {
    const charArrayValue = [];
    const cipheredArrayValue = [];

    for (let i = 0; i < value.length; i++) {
        charArrayValue.push(value.charCodeAt(i) + 1);
    }

    for (let i = 0; i < charArrayValue.length; i++) {
        cipheredArrayValue.push(String.fromCharCode(charArrayValue[i]))
    }
    
    console.log(cipheredArrayValue)
}

console.log(caesarCipher('xyz', 3))