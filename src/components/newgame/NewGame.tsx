import React from 'react';
import { useDispatch } from 'react-redux';
import { restartGame } from '../../redux/field/slice';
import styles from './newgame.module.scss';

import { sudoku, restart} from '../../assets/images/game';
import useNewGame from '../../hooks/useNewGame';
import Button from '../../styled/button/Button';

import { TDifficulty } from '../difficulty/types';
import { difficulties } from '../difficulty/difficulties';

type TNewGame = {
    setActive: Function;
}

const NewGame: React.FC<TNewGame> = ({ setActive }) => {
    const dispatch = useDispatch();
    const [startNewGame] = useNewGame();

    const handleDifficult = (diff: string) => {
        startNewGame(diff);
        setActive(false);
    }

    const handleRestart = () => {
        dispatch(restartGame(''));
    }

    const handleClassic = () => { };
    
    const handleKiller = () => { };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.variants}>
                <div className={styles.info}>
                    <p>Select Game Mode</p>
                    <p>Current game progress will be lost</p>
                </div>
                <div className={styles.controls}>
                    <Button text='Classic' size='smaller' stylish='blue' callback={handleClassic} />
                    <Button text='Killer' size='smaller' stylish='white' callback={handleKiller} />
                </div>
            </div>
            <div className={styles.difficulty}>
                {difficulties.map(({ title }) => 
                    <DifficultElement key={title} title={title} ico={sudoku} callback={handleDifficult} />
                )}
                <DifficultElement title='Restart' ico={restart} callback={handleRestart} />
            </div>
        </div>
    );
};

type TDifficultElement = { 
    ico: string, 
    callback: Function 
} & TDifficulty;

const DifficultElement: React.FC<TDifficultElement> = ({ title, ico, callback }) => {
    return (
        <div onClick={() => callback(title)} className={styles.difficult}>
            <img src={ico} alt={title} />
            <p>{title}</p>
        </div>
    )
}

export default NewGame;