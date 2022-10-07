import React from 'react';
import styles from './ngSeletor.module.scss';

import sudoku from '../../assets/images/sudoku.png';
import restart from '../../assets/images/restart.png';
import Button from '../../styled/button/Button';

type Diff = {
    title: string;
    ico: string;
    callback?: Function;
}

const diffVars: Diff[] = [
    {title: 'Easy', ico: sudoku},
    {title: 'Medium', ico: sudoku},
    {title: 'Hard', ico: sudoku},
    {title: 'Expert', ico: sudoku},
    {title: 'Evil', ico: sudoku},
    {title: 'Restart', ico: restart},
]

const NewGame = () => {
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
                {diffVars.map(({title, ico}) => <DiffElement title={title} ico={ico} />)}
            </div>
        </div>
    );
};

const DiffElement = ({ title, ico, callback }: Diff) => {
    return (
        <div className={styles.difficult}>
            <img src={ico} alt={title} />
            <p>{title}</p>
        </div>
    )
}

export default NewGame;