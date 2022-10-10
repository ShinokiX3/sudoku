import React from 'react';
import styles from './menucontent.module.scss';
import close from '../../../assets/images/close.png';

type TModalContent = {
    children: React.ReactNode;
    active: boolean;
    setActive: Function;
}

const MenuContent: React.FunctionComponent<TModalContent> = ({ children, active, setActive }) => {
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