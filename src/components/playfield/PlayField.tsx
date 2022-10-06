import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './playField.module.scss';

import { setCurrentField, setSolvedField } from '../../redux/field/slice';
import { setInitialSudoku } from './utils/setInitialSudoku';

import Solved from './solved/Solved';
import Game from './game/Game';
import { selectGameStatus } from '../../redux/field/selectors';

const PlayField: React.FunctionComponent = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectGameStatus);

    useEffect(() => {
        const [solvedSudoku, sudoku] = setInitialSudoku(5);
        dispatch(setSolvedField(solvedSudoku));
        dispatch(setCurrentField(sudoku));
    }, []);

    return (
        // rewrite game view, temporary solution
        <div className={styles.wrapper}>
            { status === 'acting' 
                ? <Game />
                : <Solved />
            }
        </div>
    );
};

export default PlayField;