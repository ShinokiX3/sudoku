import { TCell } from "../types"

export const checkStatus = (sudoku: TCell[][], solved: number[][]): boolean => {
    for (let i = 0; i < solved.length; i++) {
        for (let j = 0; j < solved.length; j++) {
            if (solved[i][j] !== sudoku[i][j].value) return false;
        }
    }
    return true;
}