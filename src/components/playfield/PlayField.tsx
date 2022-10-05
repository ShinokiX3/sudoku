import React, { PropsWithChildren, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './playField.module.scss';
import { checkIsBorder } from './utils/checkIsBorder';
import { getRequireStyle } from './utils/getRequireStyle';
import { isUserSelect } from './utils/isUserSelect';
import { setMatchesNums } from './utils/setMatchesNums';
import { Field } from './types';
import { clearMarkedFields } from './utils/clearMarkedFields';
import { setMarkedFields } from './utils/setMarkedFields';
import { setCurrentField, setSolvedField } from '../../redux/field/slice';
import { selectCurrent, selectSolved } from '../../redux/field/selectors';
import { createFieldCopy } from './utils/createFieldCopy';
import { setInitialSudoku } from './utils/setInitialSudoku';

interface PlayFieldProps extends PropsWithChildren {
    numpadSelected: number | undefined;
    setNumpadSelected: React.Dispatch<React.SetStateAction<number>>;
}

const PlayField: React.FunctionComponent<PlayFieldProps> = ({ numpadSelected, setNumpadSelected }) => {
    const [currentPosition, setCurrentPosition] = useState<number[]>();
    
    const dispatch = useDispatch();
    const solved = useSelector(selectSolved);
    const sudoku = useSelector(selectCurrent);

    useEffect(() => {
        const [solvedSudoku, sudoku] = setInitialSudoku(5);
        dispatch(setSolvedField(solvedSudoku));
        dispatch(setCurrentField(sudoku));
    }, [])

    useEffect(() => {
        if (currentPosition) {
            const [r, c] = currentPosition;
            if (sudoku && numpadSelected && numpadSelected !== 0 && sudoku[r][c].type === 'user') {
                const sudokuCopy = createFieldCopy(sudoku);
                sudokuCopy[r][c].value = sudokuCopy[r][c].value !== numpadSelected ? numpadSelected : 0;
                
                clearMarkedFields(sudokuCopy);
                setMatchesNums(sudokuCopy, r, c);
                setMarkedFields(sudokuCopy, r, c);
                
                dispatch(setCurrentField(sudokuCopy));
                setNumpadSelected(0);
            }

        }
    }, [numpadSelected])
    
    const handleSelect = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = (e.target as HTMLDivElement);
        const [i, j]: number[] = target.getAttribute('data-coord')?.split(';').map(el => +el)!;

        if (sudoku) {
            const sudokuCopy = createFieldCopy(sudoku);
            
            clearMarkedFields(sudokuCopy);
            setMarkedFields(sudokuCopy, i, j);
            setMatchesNums(sudokuCopy, i, j);

            setCurrentPosition([i, j]);
            dispatch(setCurrentField(sudokuCopy));
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
                </div>)
                :
                <></>
            }
        </div>
    );
};

export default PlayField;