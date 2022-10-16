import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMistakesAC } from '../../redux/field/slice';
import { selectMistakesAC } from '../../redux/field/selectors';
import styles from './mistakes.module.scss';

import Swticher from '../../styled/switcher/Swticher';

const Mistakes = () => {
    const dispatch = useDispatch();
    const mistakesACStatus = useSelector(selectMistakesAC);    

    useEffect(() => {
        const mistakes = localStorage.getItem('mistakes');
        if (mistakes !== null) {
            const mistakesAC = JSON.parse(mistakes!);
            dispatch(setMistakesAC(mistakesAC));
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