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
    // TODO: set type for stash
    const stash: any = {};

    let gameDiff = 0;
    switch(diff) {
        case 1: gameDiff = 50; break;
        case 2: gameDiff = 55; break;
        case 3: gameDiff = 60; break;
        case 4: gameDiff = 65; break;
        case 5: gameDiff = 70; break;
        default: gameDiff = 55;
    }

    for (let i = 0; i < gameDiff; i++) {
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