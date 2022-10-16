import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDifficulty } from '../../redux/field/slice';
import { selectDifficult } from '../../redux/field/selectors';
import styles from './difficulty.module.scss';

import useNewGame from '../../hooks/useNewGame';
import Selector from '../../styled/selector/Selector';

import { difficulties } from './difficulties'; 

const Difficulty = () => {
    const dispatch = useDispatch();
    const difficult = useSelector(selectDifficult);

    const [startNewGame] = useNewGame();
    
    // TODO: get value from global state
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const difficult = localStorage.getItem('difficult');
        if (difficult && difficult !== null) dispatch(setDifficulty(difficult));
    }, []);

    const handleSelector = () => {
        setActive(!active);
    }

    const handleDifficult = (value: string) => {
        startNewGame(value);
    }

    return (
        <div className={styles.wrapper}>
            <p className={styles.title}>Difficulty:</p>
            <div onClick={handleSelector} className={styles.value}>
                <p>{difficult}</p>
                <Selector active={active}>
                    <div className={styles.content}>
                        {difficulties.map(({title}) => 
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