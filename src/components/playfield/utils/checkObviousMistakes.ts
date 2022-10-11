import { Field } from "../types"

export const checkObviousMistakes = (sudoku: Field[][], numpad: number, r: number, c: number) => {
    const pX = r < 3 ? 0 : (r < 6 ? 3 : 6);
    const pY = c < 3 ? 0 : (c < 6 ? 3 : 6);

    for (let x = pX; x < pX + 3; x++) {
        for (let y = pY; y < pY + 3; y++) {
            if (sudoku[x][y].value === numpad && (x !== r && y !== c)) {
                sudoku[x][y].view = 'error';
                // sudoku[r][c].view = 'error'; 
            }
        }
    }

    for (let x = 0; x < sudoku.length; x++) {
        if (sudoku[r][x].value === numpad) {
            sudoku[r][x].view = 'error';
        }
    }

    for (let x = 0; x < sudoku.length; x++) {
        if (sudoku[x][c].value === numpad) {
            sudoku[x][c].view = 'error';
        }
    }
}