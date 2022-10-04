import styles from './controls.module.scss';
import undo from '../../assets/svg/undo.svg';
import erase from '../../assets/svg/erase.svg';
import notes from '../../assets/svg/notes.svg';
import hint from '../../assets/svg/hint.svg';

const Controls = () => {
    const handler = () => {
        console.log('handling...');
    }

    return (
        <div className={styles.wrapper}>
            <button className={styles.newGame}>New Game</button>
            <div className={styles.controls}>
                <Control title='Undo' callback={handler} ico={undo} />
                <Control title='Erase' callback={handler} ico={erase} />
                <Control title='Notes' callback={handler} ico={notes} />
                <Control title='Hint' callback={handler} ico={hint} />
            </div>
        </div>
    );
};

// need to set type for callback
const Control = ({title, callback, ico}: {title: string, callback: Function, ico: string}) => {
    return (
        <div className={styles.control} onClick={() => callback()}>
            <img src={ico} alt={title} />
            <span>{title}</span>
        </div>
    )
}

export default Controls;