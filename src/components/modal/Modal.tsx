import React from 'react'
import styles from './modal.module.scss';

type TModal = {
    children: React.ReactNode;
    active: boolean;
    setActive: Function;
}

const Modal: React.FunctionComponent<TModal> = ({ children, active, setActive }) => {
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