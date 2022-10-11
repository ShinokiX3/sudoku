import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentField, setSolvedField } from '../../redux/field/slice';
import { selectCurrent, selectGameStatus } from '../../redux/field/selectors';
import useNewGame from '../../hooks/useNewGame';
import styles from './playField.module.scss';

import Solved from './solved/Solved';
import Game from './game/Game';
import Paused from './paused/Paused';

const PlayField: React.FunctionComponent = memo(() => {
    const dispatch = useDispatch();

    const [startNewGame] = useNewGame();

    const current = useSelector(selectCurrent);
    const status = useSelector(selectGameStatus);

    useEffect(() => {
        if (!current && (localStorage.getItem('sudoku') === 'null' || !localStorage.getItem('sudoku'))) {
            startNewGame('Hard');
        } else if (!current && localStorage.getItem('sudoku') !== 'null') {
            const sudoku = JSON.parse(localStorage.getItem('sudoku')!);
            const solvedSudoku = JSON.parse(localStorage.getItem('solved')!);
            // dispatch(setGameStatus('paused'));
            dispatch(setSolvedField(solvedSudoku));
            dispatch(setCurrentField(sudoku));
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

const GameView: React.FC<TGameView> = ({ status }) => {
    switch(status) {
        case 'acting': return <Game />;
        case 'finished': return <Solved />;
        case 'paused': return <Paused />;
        default: return <></>;
    }
}

export default PlayField;