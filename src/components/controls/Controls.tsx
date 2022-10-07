import { useDispatch, useSelector } from 'react-redux';
import styles from './controls.module.scss';
import undo from '../../assets/svg/undo.svg';
import erase from '../../assets/svg/erase.svg';
import notes from '../../assets/svg/notes.svg';
import hint from '../../assets/svg/hint.svg';
import { setCurrentField, undoField } from '../../redux/field/slice';
import { selectCurrent, selectPosition, selectSolved } from '../../redux/field/selectors';
import { createFieldCopy } from '../playfield/utils/createFieldCopy';
import { setMatchesNums } from '../playfield/utils/setMatchesNums';
import Selector from '../../styled/selector/Selector';
import NewGame from '../newGameSelector/NewGame';
import { useState } from 'react';
import Button from '../../styled/button/Button';

const Controls = () => {
    const [active, setActive] = useState<boolean>(false);

    const dispatch = useDispatch();
    
    const sudoku = useSelector(selectCurrent);
    const solved = useSelector(selectSolved);
    const position = useSelector(selectPosition);

    const handler = () => {
        console.log('handling...');
    }

    // get history length;
    // remove required param

    const handleUndo = () => {
        dispatch(undoField(''));
    }

    const handleHint = () => {
        if (position && sudoku && solved) {
            const [r, c] = position;
            const sudokuCopy = createFieldCopy(sudoku);
            sudokuCopy[r][c].value = solved[r][c];
            
            setMatchesNums(sudokuCopy, r, c);
            dispatch(setCurrentField(sudokuCopy));
        }
    }
    
    const handleNewGame = () => {
        setActive(!active);
    }

    return (
        <div className={styles.wrapper}>
            <div style={{position: 'relative'}}>
                {/* <button onClick={handleNewGame} className={styles.newGame}>New Game</button> */}
                <Button text='New Game' stylish='blue' callback={handleNewGame} />
                <Selector active={active}>
                    <NewGame />
                </Selector>
            </div>
            <div className={styles.controls}>
                <Control title='Undo' callback={handleUndo} ico={undo} />
                <Control title='Erase' callback={handler} ico={erase} />
                <Control title='Notes' callback={handler} ico={notes} />
                <Control title='Hint' callback={handleHint} ico={hint} />
            </div>
        </div>
    );
};

// need to set type for callback

type TControl = {
    title: string;
    callback: Function;
    ico: string;
}

const Control = ({title, callback, ico}: TControl) => {
    return (
        <div onClick={() => callback()} className={styles.control}>
            <img src={ico} alt={title} />
            <span>{title}</span>
        </div>
    )
}

export default Controls;