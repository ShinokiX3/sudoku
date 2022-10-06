import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Field } from '../types';
// import styles from '../playField.module.scss';
import styles from './game.module.scss';

import { selectCurrent, selectNumpad, selectNumpadHandle, selectPosition, selectSolved } from '../../../redux/field/selectors';
import { setCurrentField, setGameStatus, setPosition } from '../../../redux/field/slice';
import { checkIsBorder } from '../utils/checkIsBorder';
import { checkStatus } from '../utils/checkStatus';
import { clearMarkedFields } from '../utils/clearMarkedFields';
import { createFieldCopy } from '../utils/createFieldCopy';
import { getRequireStyle } from '../utils/getRequireStyle';
import { isUserSelect } from '../utils/isUserSelect';
import { setMarkedFields } from '../utils/setMarkedFields';
import { setMatchesNums } from '../utils/setMatchesNums';

const Game = () => {
    const dispatch = useDispatch();
    const solved = useSelector(selectSolved);
    const sudoku = useSelector(selectCurrent);
    const position = useSelector(selectPosition);

    const numpad = useSelector(selectNumpad);
    const numpadHandle = useSelector(selectNumpadHandle);

    useEffect(() => {
        if (position) {
            const [r, c] = position;
            if (sudoku && numpad && numpad !== 0 && sudoku[r][c].type === 'user') {
                const sudokuCopy = createFieldCopy(sudoku);
                sudokuCopy[r][c].value = sudokuCopy[r][c].value !== numpad ? numpad : 0;
                
                clearMarkedFields(sudokuCopy);
                setMatchesNums(sudokuCopy, r, c);
                setMarkedFields(sudokuCopy, r, c);
                
                const status = sudokuCopy && solved ? checkStatus(sudokuCopy, solved) : true;
                if (status) dispatch(setGameStatus('finished'));
                dispatch(setCurrentField(sudokuCopy));
            }
        }
    }, [numpadHandle]);

    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLDivElement);
        const [i, j]: number[] = target.getAttribute('data-coord')?.split(';').map(el => +el)!;

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
            {sudoku ? sudoku.map((row, i) => 
                <div style={checkIsBorder(i) 
                    ? {display: 'flex', borderBottom: '2px solid'} 
                    : {display: 'flex'}}
                >
                    {row.map(({view, value, marks, type}: Field, j) => 
                        <div 
                            data-coord={`${i};${j}`}
                            onClick={handleSelect}
                            className={styles.cell + ' ' + getRequireStyle(view) + ' ' + isUserSelect(type)}
                            style={checkIsBorder(j) ? {borderRight: '2px solid'} : {}} 
                        >
                            {value === 0 ? <></> : value}
                        </div>
                    )}
                </div>
            ) : <></>}
        </div>
    );
};

export default Game;