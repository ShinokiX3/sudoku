import { useDispatch } from 'react-redux';
import { setNumpad } from '../../redux/field/slice';
import styles from './numbers.module.scss';

const Numbers = () => {
    const arr: number[] = Array.from({length: 9}, (_, i) => i + 1);

    const dispatch = useDispatch();
    const handleNumpad = (num: number) => {
        dispatch(setNumpad(num));
    }

    return (
        <div className={styles.wrapper}>
            {arr.map((num, i) => 
                <div className={styles.field} onClick={() => handleNumpad(num)}>
                    {num}
                </div>
            )}
        </div>
    );
};

export default Numbers;