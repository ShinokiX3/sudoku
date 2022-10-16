import React from 'react';
import { TModal } from '../../types';
import styles from './menu.module.scss';

import { close } from '../../../../assets/images/menu';

const MenuContent: React.FC<TModal> = ({ children, active, setActive }) => {
    const handleMenu = () => {
        setActive(!active);
        document.body!.style.overflow = 'auto';
    }
    
    return (
        <div className={styles.wrapper}>
            <div onClick={handleMenu} className={styles.menu}>
                <img src={close} alt={'close'}/>
            </div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

export default MenuContent;