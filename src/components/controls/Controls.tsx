import { useDispatch, useSelector } from 'react-redux';
import styles from './controls.module.scss';

import undo from '../../assets/svg/undo.svg';
import erase from '../../assets/svg/erase.svg';
import notes from '../../assets/svg/notes.svg';
import hint from '../../assets/svg/hint.svg';

import { ReactComponent as Undo } from '../../assets/svg/undo.svg';
import { ReactComponent as Erase } from '../../assets/svg/erase.svg';
import { ReactComponent as Notes } from '../../assets/svg/notes.svg';
import { ReactComponent as Hint } from '../../assets/svg/hint.svg';

import { setCurrentField, undoField } from '../../redux/field/slice';
import { selectCurrent, selectGameStatus, selectPosition, selectSolved } from '../../redux/field/selectors';
import { createFieldCopy } from '../playfield/utils/createFieldCopy';
import { setMatchesNums } from '../playfield/utils/setMatchesNums';
import Selector from '../../styled/selector/Selector';
import NewGame from '../newGameSelector/NewGame';
import { ReactComponentElement, useState } from 'react';
import Button from '../../styled/button/Button';
import { clearMatchesNums } from '../playfield/utils/clearMatchesNums';

const Controls = () => {
    const [active, setActive] = useState<boolean>(false);

    const dispatch = useDispatch();
    
    const sudoku = useSelector(selectCurrent);
    const solved = useSelector(selectSolved);
    const position = useSelector(selectPosition);
    const status = useSelector(selectGameStatus);

    const handler = () => {
        console.log('handling...');
    }

    // get history length;
    // remove required param

    const handleUndo = () => {
        dispatch(undoField(''));
    }

    const handleErase = () => {
        if (position && sudoku && solved) {
            const [r, c] = position;
            const sudokuCopy = createFieldCopy(sudoku);

            if (sudokuCopy[r][c].type === 'user') {
                clearMatchesNums(sudokuCopy, r, c);
                sudokuCopy[r][c].value = 0;
                dispatch(setCurrentField(sudokuCopy));
            }
        }
    }

    const handleHint = () => {
        if (position && sudoku && solved) {
            const [r, c] = position;
            const sudokuCopy = createFieldCopy(sudoku);

            sudokuCopy[r][c].value = solved[r][c];
            sudokuCopy[r][c].type = 'initial';
            
            setMatchesNums(sudokuCopy, r, c);
            dispatch(setCurrentField(sudokuCopy));
        }
    }
    
    const handleNewGame = () => {
        setActive(!active);
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.ngButton}>
                <Button text='New Game' stylish='blue' callback={handleNewGame} />
                <Selector active={active}>
                    <NewGame setActive={setActive} />
                </Selector>
            </div>
            <div className={styles.controls + ` ${status === 'finished' ? styles.disable : ''}`}>
                <Control title='Undo' callback={handleUndo} Icon={Undo} />
                <Control title='Erase' callback={handleErase} Icon={Erase} />
                <Control title='Notes' callback={handler} Icon={Notes} />
                <Control title='Hint' callback={handleHint} Icon={Hint} />
            </div>
        </div>
    );
};

// need to set type for callback

type TControl = {
    title: string;
    callback: Function;
    Icon: React.FunctionComponent;
}

const Control = ({title, callback, Icon}: TControl) => {
    return (
        <div onClick={() => callback()} className={styles.control}>
            <Icon />
            <span>{title}</span>
        </div>
    )
}

export default Controls;