import { Field } from "../types";

export const setMarkedFields = (sudokuCopy: Field[][], i: number, j: number) => {
    const pX = i < 3 ? 0 : (i < 6 ? 3 : 6);
    const pY = j < 3 ? 0 : (j < 6 ? 3 : 6);

    for (let x = pX; x < pX + 3; x++) {
        for (let y = pY; y < pY + 3; y++) {
            if (sudokuCopy[x][y].view !== 'error') {
                sudokuCopy[x][y].view = 'marked';
            }
        }
    }

    for (let x = 0; x < sudokuCopy.length; x++) {
        if (sudokuCopy[i][x].view !== 'error') {
            sudokuCopy[i][x].view = 'marked';
        }
    }

    for (let x = 0; x < sudokuCopy.length; x++) {
        if (sudokuCopy[x][j].view !== 'error') {
            sudokuCopy[x][j].view = 'marked';
        }
    }
    
    sudokuCopy[i][j].view = 'selected'; 
}