import { useEffect, useState } from 'react';
import styles from './difficulty.module.scss';
import Selector from '../../styled/selector/Selector';
import { useDispatch, useSelector } from 'react-redux';
import { selectDifficult } from '../../redux/field/selectors';
import { setDifficulty } from '../../redux/field/slice';
import useNewGame from '../../hooks/useNewGame';

// TODO: get from global state
type Diff = {
    title: string
}

const diffs: Diff[] = [
    {title: 'Easy'},
    {title: 'Medium'},
    {title: 'Hard'},
    {title: 'Expert'},
    {title: 'Evil'},

]

const Difficulty = () => {
    const dispatch = useDispatch();
    const difficult = useSelector(selectDifficult);

    const [startNewGame] = useNewGame();
    
    const [active, setActive] = useState<boolean>(false);
    // TODO: get value from global state
    const [value, setValue] = useState<string>('Hard');

    useEffect(() => {
        const difficult = localStorage.getItem('difficult');
        dispatch(setDifficulty(difficult));
    }, []);

    useEffect(() => {
        setValue(difficult);
    }, [difficult])

    const handleSelector = () => {
        setActive(!active);
    }

    const handleDifficult = (value: string) => {
        startNewGame(value);
        setValue(value);
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Difficulty:</p>
            <div onClick={handleSelector} className={styles.value}>
                <p>{value}</p>
                <Selector active={active}>
                    <div className={styles.content}>
                        {diffs.map(({title}) => 
                            <div key={title} onClick={() => handleDifficult(title)} className={styles.item}>
                                {title}
                            </div>
                        )}
                    </div>
                </Selector>
            </div>
        </div>
    );
};

export default Difficulty;