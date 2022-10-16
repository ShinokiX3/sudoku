import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentField, setSolvedField } from '../../redux/field/slice';
import { selectCurrent, selectGameStatus } from '../../redux/field/selectors';
import useNewGame from '../../hooks/useNewGame';
import styles from './playField.module.scss';

import Solved from './solved/Solved';
import Game from './game/Game';
import Paused from './paused/Paused';

const PlayField: React.FC = memo(() => {
    const dispatch = useDispatch();
    const current = useSelector(selectCurrent);
    const status = useSelector(selectGameStatus);

    const [startNewGame] = useNewGame();

    useEffect(() => {
        const lsSudoku = localStorage.getItem('sudoku'); 
        if (!current && (lsSudoku=== 'null' || !lsSudoku)) {
            startNewGame('Hard');
        } else if (!current && lsSudoku !== 'null') {
            const sudoku = JSON.parse(lsSudoku!);
            const solvedSudoku = JSON.parse(localStorage.getItem('solved')!);
            dispatch(setSolvedField(solvedSudoku));
            dispatch(setCurrentField(sudoku));
        }
    }, []);

    // TODO: rewrite game view, temporary solution

    return (
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