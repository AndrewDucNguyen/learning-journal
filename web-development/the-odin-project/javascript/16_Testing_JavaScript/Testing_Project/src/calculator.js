export const calculator = {
    Add: (num1, num2) => {
        return num1 + num2
    },
    Subtract: (num1, num2) => {
        return num1 - num2
    },
    Divide: (num1, num2) => {
        return num1 / num2
    },
    Multiply: (num1, num2) => {
        return num1 * num2
    }
}

console.log(calculator.Add(2, 2))
console.log(calculator.Subtract(2, 2))
console.log(calculator.Divide(2, 2))
console.log(calculator.Multiply(2, 2))