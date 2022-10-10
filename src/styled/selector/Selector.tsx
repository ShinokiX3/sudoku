import React, { ReactNode } from 'react';
import styles from './selector.module.scss';

type SelectorProps = {
    children: ReactNode;
    active: boolean;
    orientation?: 'left' | 'right';
}

const Selector: React.FunctionComponent<SelectorProps> = ({ children, active, orientation = 'left' }) => {
    const setOrientation = (orientation: string): string => {
        switch(orientation) {
            case 'left': return styles.left;
            case 'right': return styles.right;
            default: return styles.left;
        }
    }

    const setActive = (active: boolean): string => {
        return active ? styles.active : '';
    }

    return (
        <div className={styles.wrapper + ' ' + setOrientation(orientation) + ' ' + setActive(active)}>
            {children}
        </div>
    );
};

export default Selector;