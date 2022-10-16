import { setDifficulty } from './../../../utils/setDifficulty';
import { createBaseField } from "../../../utils/createBaseField";
import { sudokuRandomize } from "../../../utils/sudokuRandomize";
import { TCell } from "../types"


export const setInitialSudoku = (diff: number): [number[][], TCell[][]] => {
    const uniqSudoku: number[][] = sudokuRandomize(createBaseField(), 500);
    const solvedSudoku: number[][] = uniqSudoku.map(el => [...el]);
    const diffedSudoku: number[][] = setDifficulty(uniqSudoku, diff);
    const sudoku: TCell[][] = diffedSudoku.map(arr => arr.map(num => ({view: 'empty', value: num, marks: [], specialStyles: 'none', type: num !== 0 ? 'initial' : 'user'})));
    
    return [solvedSudoku, sudoku];
}