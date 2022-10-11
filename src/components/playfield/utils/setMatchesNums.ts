import { Field } from "../types";

export const setMatchesNums = (arr: Field[][], i: number, j: number) => {
    if (arr[i][j].value !== 0) {
        for (let r = 0; r < arr.length; r++) {
            for (let c = 0; c < arr.length; c++) {
                if (arr[r][c].value === arr[i][j].value && arr[r][c].view !== 'error') 
                arr[r][c].view = 'matches';
            }
        }
    }
}