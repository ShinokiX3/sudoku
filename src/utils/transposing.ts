export const transposing = (arr: number[][]): number[][] => {
    
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            let temp: number = arr[i][j]
            arr[i][j] = arr[j][i];
            arr[j][i] = temp;
        }
    }
    
    return arr;
}