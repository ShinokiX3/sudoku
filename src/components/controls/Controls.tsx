import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentField, setNotesStatus, undoField } from '../../redux/field/slice';
import { selectCurrent, selectGameStatus, selectNoteStatus, selectPosition, selectSolved } from '../../redux/field/selectors';
import styles from './controls.module.scss';

import { ReactComponent as Undo } from '../../assets/svg/undo.svg';
import { ReactComponent as Erase } from '../../assets/svg/erase.svg';
import { ReactComponent as Notes } from '../../assets/svg/notes.svg';
import { ReactComponent as Hint } from '../../assets/svg/hint.svg';

import { createFieldCopy } from '../playfield/utils/createFieldCopy';
import { setMatchesNums } from '../playfield/utils/setMatchesNums';
import { clearMatchesNums } from '../playfield/utils/clearMatchesNums';

import Selector from '../../styled/selector/Selector';
import NewGame from '../newGameSelector/NewGame';
import Button from '../../styled/button/Button';

const Controls = () => {
    const [active, setActive] = useState<boolean>(false);

    const dispatch = useDispatch();
    
    const sudoku = useSelector(selectCurrent);
    const solved = useSelector(selectSolved);
    const position = useSelector(selectPosition);
    const status = useSelector(selectGameStatus);
    const noteStatus = useSelector(selectNoteStatus);

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

    const handleNotes = () => {
        dispatch(setNotesStatus(!noteStatus));
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

    type TControl = {title: string; callback: Function; Icon: React.FC, active?: boolean};

    const controls: TControl[] = useMemo(() => {
        return [
            {title: 'Undo', callback: handleUndo, Icon: Undo},
            {title: 'Erase', callback: handleErase, Icon: Erase},
            {title: 'Notes', callback: handleNotes,  Icon: Notes, active: noteStatus},
            {title: 'Hint', callback: handleHint, Icon: Hint}
        ]
    }, [position, noteStatus])

    return (
        <div className={styles.wrapper}>
            <div className={styles.ngButton}>
                <Button text='New Game' stylish='blue' callback={handleNewGame} />
                <Selector active={active}>
                    <NewGame setActive={setActive} />
                </Selector>
            </div>
            <div className={styles.controls + ` ${status === 'finished' ? styles.disable : ''}`}>
                {controls.map(({title, callback, Icon, active}: TControl) => 
                    <Control key={title} title={title} callback={callback} Icon={Icon} active={active} />
                )}
            </div>
        </div>
    );
};

// need to set type for callback

type TControl = {
    title: string;
    callback: Function;
    Icon: React.FunctionComponent;
    active?: boolean | null;
}

const Control = ({title, callback, Icon, active = null}: TControl) => {
    return (
        <div onClick={() => callback()} className={styles.control + ` ${active ? styles.svgactive : ''}`}>
            <Icon />
            <span>{title}</span>
            {active !== null 
                ? <span className={styles.ctrlstatus + ` ${active ? styles.ctrlactive : styles.ctrldisable}`}>
                    {active ? 'ON' : 'OFF'}
                  </span>
                : <></>
            }
        </div>
    )
}

export default Controls;