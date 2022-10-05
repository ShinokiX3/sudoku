import React, { SetStateAction } from 'react';
import styles from './numbers.module.scss';

const Numbers = ({ handleNumpad }: any) => {
    const arr: number[] = Array.from({length: 9}, (_, i) => i + 1);

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