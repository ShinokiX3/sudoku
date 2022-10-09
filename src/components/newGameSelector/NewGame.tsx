import React from 'react';
import styles from './ngSeletor.module.scss';

import sudoku from '../../assets/images/sudoku.png';
import restart from '../../assets/images/restart.png';
import Button from '../../styled/button/Button';
import { setInitialSudoku } from '../playfield/utils/setInitialSudoku';
import { useDispatch } from 'react-redux';
import { restartGame, setCurrentField, setSolvedField, setToInitial } from '../../redux/field/slice';

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

    const handleDifficult = (diff: string) => {
        // TODO: create global function that can set new sudoku field and clear localstorage
        let gameDiff = 0;

        switch(diff) {
            case 'Easy': gameDiff = 1; break;
            case 'Normal': gameDiff = 2; break;
            case 'Hard': gameDiff = 3; break;
            case 'Expert': gameDiff = 4; break;
            case 'Evil': gameDiff = 5; break;
            default: gameDiff = 2; break;
        }

        const [solvedSudoku, sudoku] = setInitialSudoku(gameDiff);
        // TODO: Make payload optional
        
        dispatch(setToInitial(''));
        dispatch(setSolvedField(solvedSudoku));
        dispatch(setCurrentField(sudoku));

        localStorage.removeItem('sudoku');
        localStorage.removeItem('solved');

        setActive(false);
    }

    const handleRestart = () => {
        dispatch(restartGame(''));
    }
    
    return (
        <div>
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