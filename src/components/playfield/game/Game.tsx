import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrent, selectGameStatus, selectNoteStatus, selectNumpad, selectNumpadHandle, selectPosition, selectSolved } from '../../../redux/field/selectors';
import { setCurrentField, setGameStatus, setPosition } from '../../../redux/field/slice';
import { Field } from '../types';
import styles from './game.module.scss';

import { checkIsBorder } from '../utils/checkIsBorder';
import { checkStatus } from '../utils/checkStatus';
import { clearMarkedFields } from '../utils/clearMarkedFields';
import { createFieldCopy } from '../utils/createFieldCopy';
import { getRequireStyle } from '../utils/getRequireStyle';
import { isUserSelect } from '../utils/isUserSelect';
import { setMarkedFields } from '../utils/setMarkedFields';
import { setMatchesNums } from '../utils/setMatchesNums';
import { checkObviousMistakes } from '../utils/checkObviousMistakes';

const Game = () => {
    const dispatch = useDispatch();
    const solved = useSelector(selectSolved);
    const sudoku = useSelector(selectCurrent);
    const position = useSelector(selectPosition);

    const numpad = useSelector(selectNumpad);
    const numpadHandle = useSelector(selectNumpadHandle);
    const noteStatus = useSelector(selectNoteStatus);

    useEffect(() => {
        if (position && !noteStatus) {
            const [r, c] = position;

            if (sudoku && numpad && numpad !== 0 && sudoku[r][c].type === 'user') {
                const sudokuCopy = createFieldCopy(sudoku);

                sudokuCopy[r][c].marks = [];
                sudokuCopy[r][c].value = sudokuCopy[r][c].value !== numpad ? numpad : 0;

                clearMarkedFields(sudokuCopy);
                setMatchesNums(sudokuCopy, r, c);
                setMarkedFields(sudokuCopy, r, c);

                // checkObviousMistakes(sudokuCopy, numpad, r, c);
                
                const status = sudokuCopy && solved ? checkStatus(sudokuCopy, solved) : true;
                if (status) dispatch(setGameStatus('finished'));
                dispatch(setCurrentField(sudokuCopy));
            }

        } else if (position && noteStatus) {
            console.log(noteStatus);
            const [r, c] = position;

            if (sudoku && numpad && numpad !== 0 && sudoku[r][c].type === 'user') {
                const sudokuCopy = createFieldCopy(sudoku);
                
                sudokuCopy[r][c].value = 0;

                const idx = sudokuCopy[r][c].marks.indexOf(numpad);
                
                sudokuCopy[r][c].marks = idx === -1 
                    ? [...sudokuCopy[r][c].marks, numpad].sort()
                    : [...sudokuCopy[r][c].marks.slice(0, idx), ...sudokuCopy[r][c].marks.slice(idx + 1)].sort();
                
                dispatch(setCurrentField(sudokuCopy));
            }
        }
    }, [numpadHandle]);

    useEffect(() => {
        if (sudoku) {
            const currentJSON = JSON.stringify(sudoku);
            localStorage.setItem('sudoku', currentJSON);
            if (localStorage.getItem('solved') === 'null' || !localStorage.getItem('solved')) {
                const solvedJSON = JSON.stringify(solved);
                localStorage.setItem('solved', solvedJSON);
            }
        }
    }, [sudoku])

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLDivElement);
        const [i, j]: number[] = target.getAttribute('data-coord')?.split(';').map(el => +el)!;

        if (sudoku) {
            // TODO: compose functions
            const sudokuCopy = createFieldCopy(sudoku);
            clearMarkedFields(sudokuCopy);
            setMarkedFields(sudokuCopy, i, j);
            setMatchesNums(sudokuCopy, i, j);

            dispatch(setPosition([i, j]));
            dispatch(setCurrentField(sudokuCopy));
        }
    }

    return (
        <div className={styles.wrapper}>
            {sudoku 
                ? sudoku.map((row, i) => 
                    <div key={i} className={checkIsBorder(i) ? styles.borderBottom + ' ' + styles.rowWrapper : styles.rowWrapper}>
                        <Row key={i} row={row} i={i} handleSelect={handleSelect} />
                    </div>) 
                : <></>
            }
        </div>
    );
};

type TRow = {
    row: Field[], 
    i: number, 
    handleSelect: Function
}

const Row: React.FC<TRow> = ({row, i, handleSelect}) => {
    return (
        <div key={i} className={checkIsBorder(i) ? styles.borderBottom + ' ' + styles.rowWrapper : styles.rowWrapper}>
            {row.map((cell, j) => 
                <Cell key={j} cell={cell} i={i} j={j} handleSelect={handleSelect} />
            )}
        </div>
    )
}

type TCell = {
    cell: Field;
    i: number;
    j: number;
    handleSelect: Function;
}

const Cell: React.FC<TCell> = ({cell, i, j, handleSelect}) => {
    const status = useSelector(selectGameStatus);

    const { view, value, marks, type } = cell;

    return (
        <div key={j} onClick={(e) => handleSelect(e)} data-coord={`${i};${j}`}
            className={styles.cell + ' ' + getRequireStyle(status === 'paused' ? '' : view) + ' ' + isUserSelect(type)}
            style={checkIsBorder(j) ? {borderRight: '2px solid #344861'} : {}} 
        >
            {marks.length < 1 && (value === 0 || status === 'paused')
                ? <></> 
                : <div className={styles.value}>
                    {value === 0 && marks.length > 0 
                        ? <div className={styles.marks}>
                            {marks.map(mark => <p>{mark}</p>)}
                          </div> 
                        : value
                    }
                  </div>
            }
        </div>
    )
}

export default Game;