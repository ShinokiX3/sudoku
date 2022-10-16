import { useDispatch, useSelector } from 'react-redux';
import { setNumpad } from '../../redux/field/slice';
import { selectGameStatus } from '../../redux/field/selectors';
import styles from './numbers.module.scss';

const numbers: number[] = Array.from({length: 9}, (_, i) => i + 1);

const Numbers = () => {
    const dispatch = useDispatch();
    const status = useSelector(selectGameStatus);

    const handleNumpad = (number: number) => {
        dispatch(setNumpad(number));
    }

    return (
        <div className={styles.wrapper + ` ${status === 'finished' ? styles.disable : ''}`}>
            {numbers.map((number) => 
                <div key={number} className={styles.field} onClick={() => handleNumpad(number)}>
                    {number}
                </div>
            )}
        </div>
    );
};

export default Numbers;