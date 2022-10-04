import { getRandomNumber } from "./getRandomNumber";

export const swapColumnsSmall = (arr: number[][]): number[][] => {
    const range = getRandomNumber(1, 3);
    const min = range * 3 - 3;
    const max = range * 3 - 1;
    const x = getRandomNumber(min, max);
    const y = getRandomNumber(min, max, x);

    for (let i = 0; i < arr.length; i++) {
        let temp: number = arr[i][x];
        arr[i][x] = arr[i][y];
        arr[i][y] = temp;
    }

    return arr;
}