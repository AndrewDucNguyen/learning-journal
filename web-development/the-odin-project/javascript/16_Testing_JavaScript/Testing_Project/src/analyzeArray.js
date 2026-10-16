export const analyzeArray = (arr) => {
    const initialValue = 0;
    const average = (arr.reduce((acc, curr) => acc + curr, initialValue)) / arr.length

    const result = {
        average: average,
        min: Math.min(...arr),
        max: Math.max(...arr),
        length: arr.length
    }
    return result
}
