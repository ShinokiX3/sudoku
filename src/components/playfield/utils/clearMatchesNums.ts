import { Field } from "../types";

export const clearMatchesNums = (arr: Field[][], i: number, j: number) => {
    for (let r = 0; r < arr.length; r++) {
        for (let c = 0; c < arr.length; c++) {
            if (arr[r][c].value === arr[i][j].value && r !== i && c !== j) 
            arr[r][c].view = 'empty';
        }
    }
}