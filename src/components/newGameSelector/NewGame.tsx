import React from 'react';
import styles from './ngSeletor.module.scss';

import sudoku from '../../assets/images/sudoku.png';
import restart from '../../assets/images/restart.png';
import Button from '../../styled/button/Button';
import { setInitialSudoku } from '../playfield/utils/setInitialSudoku';
import { useDispatch } from 'react-redux';
import { restartGame, setCurrentField, setDifficulty, setSolvedField, setToInitial } from '../../redux/field/slice';
import useNewGame from '../../hooks/useNewGame';

type Diff = {
    title: string;
    ico: string;
}

const diffVars: Diff[] = [
    {title: 'Easy', ico: sudoku},
    {title: 'Medium', ico: sudoku},
    {title: 'Hard', ico: sudoku},
    {title: 'Expert', ico: sudoku},
    {title: 'Evil', ico: sudoku}
];

type TNewGame = {
    setActive: Function;
}

const NewGame: React.FunctionComponent<TNewGame> = ({ setActive }) => {
    const dispatch = useDispatch();
    const [startNewGame] = useNewGame();

    const handleDifficult = (diff: string) => {
        startNewGame(diff);
        setActive(false);
    }

    const handleRestart = () => {
        dispatch(restartGame(''));
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.variants}>
                <div className={styles.info}>
                    <p>Select Game Mode</p>
                    <p>Current game progress will be lost</p>
                </div>
                <div className={styles.controls}>
                    <Button text='Classic' size='smaller' stylish='blue' callback={() => console.log('Classic')} />
                    <Button text='Killer' size='smaller' stylish='white' callback={() => console.log('Killer')} />
                </div>
            </div>
            <div className={styles.difficulty}>
                {diffVars.map(({title, ico}) => 
                    <DiffElement key={title} title={title} ico={ico} callback={handleDifficult} />
                )}
                <DiffElement title='Restart' ico={restart} callback={handleRestart} />
            </div>
        </div>
    );
};

type TDiffElement = Diff & { callback: Function }

const DiffElement: React.FunctionComponent<TDiffElement> = ({ title, ico, callback }) => {
    return (
        <div onClick={() => callback(title)} className={styles.difficult}>
            <img src={ico} alt={title} />
            <p>{title}</p>
        </div>
    )
}

export default NewGame;