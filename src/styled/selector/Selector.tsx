import React, { ReactNode } from 'react';
import styles from './selector.module.scss';

type SelectorProps = {
    children: ReactNode;
    active: boolean;
}

const Selector: React.FunctionComponent<SelectorProps> = ({ children, active }) => {
    return (
        <div className={styles.wrapper} style={active ? {opacity: '1'} : {opacity: '0', pointerEvents: 'none'}}>
            {children}
        </div>
    );
};

export default Selector;