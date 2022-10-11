import { useDispatch, useSelector } from 'react-redux';
import { selectGameStatus, selectNoteStatus } from '../../redux/field/selectors';
import { setNumpad } from '../../redux/field/slice';
import styles from './numbers.module.scss';

const arr: number[] = Array.from({length: 9}, (_, i) => i + 1);

const Numbers = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectGameStatus);
    const noteStatus = useSelector(selectNoteStatus);

    const handleNumpad = (num: number) => {
        dispatch(setNumpad(num));
    }

    return (
        <div className={styles.wrapper + ` ${status === 'finished' ? styles.disable : ''}`}>
            {arr.map((num) => 
                <div key={num} className={styles.field} onClick={() => handleNumpad(num)}>
                    {num}
                </div>
            )}
        </div>
    );
};

export default Numbers;