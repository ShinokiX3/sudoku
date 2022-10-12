import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

import LinkButton from '../../styled/linkButton/LinkButton';
import logo from '../../assets/svg/logo.svg';
import dark from '../../assets/svg/dark.svg';
import Selector from '../../styled/selector/Selector';
import NewGame from '../newGameSelector/NewGame';


import facebook from '../../assets/svg/facebook.svg';
import open from '../../assets/images/open.png';
import Modal from '../modal/Modal';
import MenuContent from '../modal/modals/MenuContent';

type TLink = {
    title: string;
    path: string;
}

const headerLinks: TLink[] = [
    {title: 'Event', path: '/event'},
    {title: 'Awards', path: '/awards'},
    {title: 'Rules', path: '/rules'},
    {title: 'Tips', path: '/tips'},
];

const Header = () => {
    const [active, setActive] = useState<boolean>(false);
    const [menuActive, setMenuActive] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Temporary solution

    useEffect(() => {
        const body = document.querySelector('body')!;
        body.setAttribute('data-theme', theme);
    }, [theme])

    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    }

    const handleNewGame = () => {
        setActive(!active);
    }

    const handleMenu = () => {
        setMenuActive(!menuActive);
        document.body!.style.overflow = 'hidden';
    }

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <div onClick={handleMenu} className={styles.menu}>
                        <img src={open} alt={'open'}/>
                    </div>
                    <Link to='/'>
                        <img src={logo} alt="sudoku web-app main page  " />
                    </Link>
                </div>

                <div className={styles.newGame}>
                    <button onClick={handleNewGame} className={styles.button}>New Game</button>
                    <Selector active={active} orientation='right'>
                        <NewGame setActive={setActive} />
                    </Selector>
                </div>
                
                <nav>
                    {headerLinks.map(({title, path}: TLink) => <LinkButton key={title} path={path} title={title}/>)}
                    <div className={styles.theme} onClick={handleTheme}>
                        <img src={dark} alt="light theme" /> 
                    </div>
                </nav>
            </div>
            {menuActive 
                ? <Modal active={menuActive} setActive={setMenuActive}>
                    <MenuContent active={menuActive} setActive={setMenuActive}>
                        <div style={{display: 'flex', flexDirection: 'column', fontSize: '13pt'}}>
                            {headerLinks.map(({title, path}: TLink) => <LinkButton key={title} path={path} title={title}/>)}
                            <img src={facebook} alt="facebook" />
                        </div>
                    </MenuContent>
                  </Modal> 
                : <></>
            }
        </header>
    );
};

export default Header;