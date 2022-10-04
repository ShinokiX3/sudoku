import { getRandomNumber } from './getRandomNumber';
import { solve } from './solve';

const findNulls = (arr: number[][], size: number) => {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (arr[i][j] === 0) return [i, j];
        }
    }
    return null;
}

export const setDifficulty = (arr: number[][], diff: number): number[][] => {
    const size = arr.length;

    // set type for stash
    const stash: any = {};
    
    // calc diff ? 4; 2-4;
    for (let i = 0; i < 65; i++) {
        const r = getRandomNumber(0, size - 1);
        const c = getRandomNumber(0, size - 1);

        if (stash[r] === c) { i--; continue; }
        else {
            const temp = arr[r][c];
            arr[r][c] = 0;
            const solved = solve(arr);
            if (findNulls(solved, size) === null) { stash[r] = c; continue; }
            else { arr[r][c] = temp; i--; continue }
        }
    }

    return arr;
}