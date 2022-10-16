import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentField, setGameStatus, setPosition } from '../../../redux/field/slice';

import { 
    selectCurrent, 
    selectGameStatus, 
    selectMistakesAC, 
    selectNoteStatus, 
    selectNumpad, 
    selectNumpadHandle, 
    selectPosition, 
    selectSolved 
} from '../../../redux/field/selectors';

import { TCell } from '../types';
import styles from './game.module.scss';

import { 
    checkIsBorder,
    checkStatus,
    clearMarkedFields,
    createFieldCopy,
    getRequireStyle,
    isUserSelect,
    setMarkedFields,
    setMatchesNums
} from '../utils';

const Game = () => {
    const dispatch = useDispatch();
    const solved = useSelector(selectSolved);
    const sudoku = useSelector(selectCurrent);
    const position = useSelector(selectPosition);
    const numpad = useSelector(selectNumpad);
    const numpadHandle = useSelector(selectNumpadHandle);
    const noteStatus = useSelector(selectNoteStatus);
    const mistakesAutoChek = useSelector(selectMistakesAC);

    useEffect(() => {
        if (position && !noteStatus) {
            const [r, c] = position;

            if (sudoku && numpad && numpad !== 0 && sudoku[r][c].type === 'user') {
                const sudokuCopy = createFieldCopy(sudoku);
                
                sudokuCopy[r][c].marks = [];

                if (sudokuCopy[r][c].value !== numpad) {
                    sudokuCopy[r][c].value = numpad;
                    sudokuCopy[r][c].specialStyles = 'none';
                } else {
                    sudokuCopy[r][c].value = 0;
                    sudokuCopy[r][c].specialStyles = 'none';
                }

                clearMarkedFields(sudokuCopy);
                setMatchesNums(sudokuCopy, r, c);
                setMarkedFields(sudokuCopy, r, c);

                if (mistakesAutoChek && solved && sudokuCopy[r][c].value !== 0 && sudokuCopy[r][c].value !== solved[r][c]) {
                    sudokuCopy[r][c].specialStyles = 'red';
                }
                
                const status = sudokuCopy && solved ? checkStatus(sudokuCopy, solved) : true;
                if (status) dispatch(setGameStatus('finished'));
                dispatch(setCurrentField(sudokuCopy));
            }

        } else if (position && noteStatus) {
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
            const lsSolved = localStorage.getItem('solved');
            localStorage.setItem('sudoku', currentJSON);
            if (lsSolved === 'null' || !lsSolved) {
                const solvedJSON = JSON.stringify(solved);
                localStorage.setItem('solved', solvedJSON);
            }
        }
    }, [sudoku])

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLDivElement);
        const [i, j]: number[] = target.getAttribute('data-coord')?.split(';').map(el => +el)!;

        // TODO: compose functions

        if (sudoku) {
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
    row: TCell[], 
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

type TCellProps = {
    cell: TCell;
    i: number;
    j: number;
    handleSelect: Function;
}

const Cell: React.FC<TCellProps> = ({cell, i, j, handleSelect}) => {
    const status = useSelector(selectGameStatus);
    const mistakesAutoCheck = useSelector(selectMistakesAC);

    const { view, value, marks, specialStyles, type } = cell;

    return (
        <div key={j} onClick={(e) => handleSelect(e)} data-coord={`${i};${j}`}
            className={styles.cell + ' ' + getRequireStyle(status === 'paused' ? '' : view) + ' ' + isUserSelect(type) + ' ' + (mistakesAutoCheck ? getRequireStyle(specialStyles) : '')}
            style={checkIsBorder(j) ? {borderRight: '2px solid #344861'} : {}} 
        >
            {marks.length < 1 && (value === 0 || status === 'paused')
                ? <></> 
                : <div className={styles.value}>
                    {marks.length > 0 && value === 0 && status !== 'paused' 
                        ? <div className={styles.marks}>
                            {marks.map(mark => <p key={mark}>{mark}</p>)}
                          </div> 
                        : status === 'paused' ? <></> : value
                    }
                  </div>
            }
        </div>
    )
}

export default Game;