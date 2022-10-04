import React, { useEffect, useRef, useState } from 'react';
import { createBaseField } from '../../utils/createBaseField';
import { setDifficulty } from '../../utils/setDifficulty';
import { solve } from '../../utils/solve';
import { sudokuRandomize } from '../../utils/sudokuRandomize';
import styles from './playField.module.scss';

// [
//     [{viev: 'darker', num: somenum, markNum: somemarknum}]
// ]

type Field = {
    viev: 'selected' | 'error' | 'marked' | 'empty' | 'matches';
    num: number;
    marks: number[];
}

const checkIsBorder = (i: number) => {
    return i === 2 || i === 5 || i === 8;
}

const getRequireStyle = (viev: string): string => {
    switch(viev) {
        case 'selected': return styles.selected;
        case 'marked': return styles.marked;
        case 'matches': return styles.matches;
        case 'empty': return '';
        case 'error': return '';
        default: return '';
    }
}

const PlayField = () => {
    const [selectedCell, setSelectedCell] = useState<number[]>();
    const [solvedSudoku, setSolvedSudoku] = useState<number[][]>();
    const [sudoku, setSudoku] = useState<Field[][]>();

    useEffect(() => {
        const initialSudoku: number[][] = createBaseField();
        const randomizedSudoku: number[][] = sudokuRandomize(initialSudoku, 500);
        
        const solvedSudoku: number[][] = randomizedSudoku.map(el => [...el]);
        const uniqSudoku: number[][] = setDifficulty(randomizedSudoku, 5);
        
        const sudoku: Field[][] = uniqSudoku.map(el => el.map(num => ({viev: 'empty', num: num, marks: []})));

        setSolvedSudoku(solvedSudoku)
        setSudoku(sudoku);
    }, [])
    
    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLDivElement);
        const [i, j]: number[] = target.getAttribute('data-coord')?.split(';').map(el => +el)!;

        if (sudoku) {
            console.log(sudoku[i][j]);
            const sudokuCopy: Field[][] = sudoku.map(el => [...el]);
            
            for (let r = 0; r < sudokuCopy.length; r++) {
                for (let c = 0; c < sudokuCopy.length; c++) {
                    sudokuCopy[r][c].viev = 'empty';
                }
            }

            for (let x = 0; x < sudokuCopy.length; x++) {
                sudokuCopy[i][x].viev = 'marked';
            }

            for (let x = 0; x < sudokuCopy.length; x++) {
                sudokuCopy[x][j].viev = 'marked';
            }

            if (sudokuCopy[i][j].num !== 0) {
                for (let r = 0; r < sudokuCopy.length; r++) {
                    for (let c = 0; c < sudokuCopy.length; c++) {
                        if (sudokuCopy[r][c].num === sudokuCopy[i][j].num) 
                            sudokuCopy[r][c].viev = 'matches';
                    }
                }
            }

            sudokuCopy[i][j].viev = 'selected'; 

            setSelectedCell([i, j]);
            setSudoku(sudokuCopy);
        }
    }

    return (
        // rewrite game view, temporary solution
        <div className={styles.wrapper}>
            {sudoku ? sudoku.map((row, i) => 
                <div style={checkIsBorder(i) 
                    ? {display: 'flex', borderBottom: '2px solid'} 
                    : {display: 'flex'}}
                >
                    {row.map(({viev, num, marks}: Field, j) => 
                        <div 
                            data-coord={`${i};${j}`}
                            onClick={handleSelect}
                            style={checkIsBorder(j) ? {borderRight: '2px solid'} : {}} 
                            className={styles.cell + ' ' + getRequireStyle(viev)}
                        >
                            {num === 0 ? <></> : num}
                        </div>
                    )}
                </div>)
                :
                <></>
            }
        </div>
    );
};

export default PlayField;