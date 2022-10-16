import React from 'react';
import { TModal } from './types';
import styles from './modal.module.scss';

const Modal: React.FC<TModal> = ({ children, active, setActive }) => {
    const handleActive = () => {
        setActive(!active)
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default Modal;