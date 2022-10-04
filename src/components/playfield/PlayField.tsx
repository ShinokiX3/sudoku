import React from 'react';
import { createBaseField } from '../../utils/createBaseField';
import { setDifficulty } from '../../utils/setDifficulty';
import { solve } from '../../utils/solve';
import { sudokuRandomize } from '../../utils/sudokuRandomize';
import styles from './playField.module.scss';

// let input = [
//     [4, 0, 1, 0],
//     [0, 2, 0, 0],
//     [0, 0, 3, 0],
//     [0, 0, 2, 0],
// ]

// let input = [
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 1, 0],
//     [0, 0, 2, 0],
// ]

let input = [
    [4, 3, 1, 2],
    [1, 2, 4, 3],
    [2, 1, 3, 4],
    [3, 4, 2, 1]
]

const initialSudoku: number[][] = createBaseField();
const uniqqSudoku: number[][] = sudokuRandomize(initialSudoku, 500);
const uniqSudoku: number[][] = setDifficulty(uniqqSudoku, 5);

const PlayField = () => {
    // const res: number[][] = swapColumnsArea(swapRowsArea(swapColumnsSmall(swapRowsSmall(transposing(createBaseField())))));
    
    // let input = [
    //     [0, 0, 1, 0],
    //     [0, 0, 0, 0],
    //     [0, 0, 3, 0],
    //     [0, 0, 2, 0],
    // ]

    // console.log(setDifficulty(input, 4));
    // console.log(solve(input));
    // console.log(uniqSudoku);

    return (
        // rewrite game view, temporary solution
        <div className={styles.wrapper}>
            {/* {arr.map(el => el.map(el2 => <div>{el2}</div>))} */}
            {
                uniqSudoku.map((field, i) => 
                    <div style={i === 2 || i === 5 || i === 8 ? {display: 'flex', borderBottom: '2px solid'} : {display: 'flex'}}>
                        {field.map((el, j) => 
                            <div style={j === 2 || j === 5 || j === 8 ? {borderRight: '2px solid'} : {}} className={styles.cell}>{el === 0 ? <></> : el}</div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default PlayField;