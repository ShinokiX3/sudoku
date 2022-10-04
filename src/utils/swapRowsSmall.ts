import { getRandomNumber } from './getRandomNumber';

export const swapRowsSmall = (arr: number[][]): number[][] => {
    // const swappedArray: Array<Array<number>> = [...arr.map(el => [...el])];
    const range = getRandomNumber(1, 3);
    const min = range * 3 - 3;
    const max = range * 3 - 1;
    const x = getRandomNumber(min, max);
    const y = getRandomNumber(min, max, x);

    let temp: number[] = arr[x];
    arr[x] = arr[y];
    arr[y] = temp;
    
    return arr;
}