import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './playField.module.scss';

import { setCurrentField, setGameStatus, setSolvedField } from '../../redux/field/slice';
import { setInitialSudoku } from './utils/setInitialSudoku';

import Solved from './solved/Solved';
import Game from './game/Game';
import { selectCurrent, selectGameStatus } from '../../redux/field/selectors';
import Paused from './paused/Paused';

const PlayField: React.FunctionComponent = memo(() => {
    const dispatch = useDispatch();

    const current = useSelector(selectCurrent);
    const status = useSelector(selectGameStatus);

    useEffect(() => {
        if (!current && (localStorage.getItem('sudoku') === 'null' || !localStorage.getItem('sudoku'))) {
            const [solvedSudoku, sudoku] = setInitialSudoku(2);
            dispatch(setSolvedField(solvedSudoku));
            dispatch(setCurrentField(sudoku));
        } else if (!current && localStorage.getItem('sudoku') !== 'null') {
            const sudoku = JSON.parse(localStorage.getItem('sudoku')!);
            const solvedSudoku = JSON.parse(localStorage.getItem('solved')!);
            // dispatch(setGameStatus('paused'));
            dispatch(setSolvedField(solvedSudoku));
            dispatch(setCurrentField(sudoku));
        }

        return () => {
            if (status !== 'finished') {
                // dispatch(setGameStatus('paused'));
            }
        }
    }, []);

    return (
        // rewrite game view, temporary solution
        <div className={styles.wrapper}>
            {current 
                ? <GameView status={status} />
                : <div>Loading...</div>
            }
        </div>
    );
});

type TGameView = {
    status: string
}

const GameView: React.FunctionComponent<TGameView> = ({ status }) => {
    switch(status) {
        case 'acting': return <Game />;
        case 'finished': return <Solved />;
        case 'paused': return <Paused />;
        default: return <></>;
    }
}

export default PlayField;