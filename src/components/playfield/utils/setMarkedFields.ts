import { Field } from "../types";

export const setMarkedFields = (sudokuCopy: Field[][], i: number, j: number) => {
    for (let x = 0; x < sudokuCopy.length; x++) {
        sudokuCopy[i][x].view = 'marked';
    }

    for (let x = 0; x < sudokuCopy.length; x++) {
        sudokuCopy[x][j].view = 'marked';
    }
    sudokuCopy[i][j].view = 'selected'; 
}