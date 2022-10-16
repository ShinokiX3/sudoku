import React from 'react';
import styles from './button.module.scss';

type TButton = {
    text: string;
    size?: 'bigger' | 'smaller'
    stylish: 'blue' | 'white';
    callback: Function;
}

const Button: React.FC<TButton> = ({ text, size = 'bigger', stylish, callback }) => {
    return (
        <button onClick={() => callback()} className={styles.basic + ' ' + styles[stylish] + ' ' + styles[size]}>
            {text}
        </button>
    );
};

export default Button;