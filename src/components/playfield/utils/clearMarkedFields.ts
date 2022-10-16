import { TCell } from "../types";

export const clearMarkedFields = (sudokuCopy: TCell[][]) => {
    for (let r = 0; r < sudokuCopy.length; r++) {
        for (let c = 0; c < sudokuCopy.length; c++) {
            if (sudokuCopy[r][c].view !== 'error') {
                sudokuCopy[r][c].view = 'empty';
            }
        }
    }
}