import { Field } from "../types";

export const clearMarkedFields = (sudokuCopy: Field[][]) => {
    for (let r = 0; r < sudokuCopy.length; r++) {
        for (let c = 0; c < sudokuCopy.length; c++) {
            console.log(sudokuCopy[r][c]);
            sudokuCopy[r][c].view = 'empty';
        }
    }
}