import React from 'react';
import styles from './numbers.module.scss';

const Numbers = () => {
    const arr: number[] = Array.from({length: 9}, (_, i) => i + 1);

    return (
        <div className={styles.wrapper}>
            {arr.map(item => <div className={styles.field}>{item}</div>)}
        </div>
    );
};

export default Numbers;