import { useState } from 'react';
import styles from './difficulty.module.scss';
import Selector from '../../styled/selector/Selector';

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
    const [active, setActive] = useState<boolean>(false);
    // TODO: get value from global state
    const [value, setValue] = useState<string>('Hard');

    const handleSelector = () => {
        setActive(!active);
    }

    const handleDifficult = (value: string) => {
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
                            <div onClick={() => handleDifficult(title)} className={styles.item}>
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