import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectMistakesAC } from '../../redux/field/selectors';
import { setMistakesAC } from '../../redux/field/slice';
import Swticher from '../../styled/switcher/Swticher';
import styles from './mistakes.module.scss';

const Mistakes = () => {
    const dispatch = useDispatch();
    const mistakesACStatus = useSelector(selectMistakesAC);    

    useEffect(() => {
        if (localStorage.getItem('mistakes') !== null) {
            const mistakes = JSON.parse(localStorage.getItem('mistakes')!);
            dispatch(setMistakesAC(mistakes));
        }
    }, []);

    
    const handleMistakes = () => {
        localStorage.setItem('mistakes', String(!mistakesACStatus));
        dispatch(setMistakesAC(!mistakesACStatus));
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Auto-Check for Mistakes</p>
            <Swticher active={mistakesACStatus} setActive={handleMistakes} />
        </div>
    );
};

export default Mistakes;