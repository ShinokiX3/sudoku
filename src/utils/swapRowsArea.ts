import { getRandomNumber } from './getRandomNumber';

// Temporary solution

export const swapRowsArea = (arr: number[][]): number[][] => {
    const rangeX = getRandomNumber(1, 3);
    const minX = rangeX * 3 - 3;

    const rangeY = getRandomNumber(1, 3, rangeX);
    const minY = rangeY * 3 - 3;

    let temp: number[] = arr[minX]; 
    arr[minX] = arr[minY];
    arr[minY] = temp;

    temp = arr[minX + 1]; 
    arr[minX + 1] = arr[minY + 1];
    arr[minY + 1] = temp;

    temp = arr[minX + 2]; 
    arr[minX + 2] = arr[minY + 2];
    arr[minY + 2] = temp;

    return arr;
}