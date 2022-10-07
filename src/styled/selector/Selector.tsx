import React, { ReactNode } from 'react';
import styles from './selector.module.scss';

type SelectorProps = {
    children: ReactNode,
    active: boolean
}

const Selector: React.FunctionComponent<SelectorProps> = ({ children, active }) => {
    return (
        <>
            {active 
                ? <div className={styles.wrapper}>{children}</div>
                : null
            }
        </>
    );
};

export default Selector;