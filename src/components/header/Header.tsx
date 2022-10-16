import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TLink } from './types';
import styles from './header.module.scss';

import logo from '../../assets/svg/branding/logo.svg';
import dark from '../../assets/svg/theme/dark.svg';
import facebook from '../../assets/svg/social/facebook.svg';
import { open } from '../../assets/images/menu';

import LinkButton from '../../styled/linkButton/LinkButton';
import Selector from '../../styled/selector/Selector';
import NewGame from '../newgame/NewGame';

import Modal from '../modal/Modal';
import Menu from '../modal/modals/menu/Menu';

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
                        <img src={logo} alt="sudoku web-app main page" />
                    </Link>
                </div>

                <div className={styles.newGame}>
                    <button onClick={handleNewGame} className={styles.button}>New Game</button>
                    <Selector active={active} orientation='right'>
                        <NewGame setActive={setActive} />
                    </Selector>
                    <div className={styles.theme} onClick={handleTheme}>
                        <img src={dark} alt="theme" /> 
                    </div>
                </div>
                
                <nav>
                    {headerLinks.map(({title, path}: TLink) => <LinkButton key={title} path={path} title={title}/>)}
                    <div className={styles.theme} onClick={handleTheme}>
                        <img src={dark} alt="theme" /> 
                    </div>
                </nav>
            </div>
            {menuActive 
                ? <Modal active={menuActive} setActive={setMenuActive}>
                    <Menu active={menuActive} setActive={setMenuActive}>
                        <div className={styles.menuLinks}>
                            {headerLinks.map(({title, path}: TLink) => <LinkButton key={title} path={path} title={title}/>)}
                            <img src={facebook} alt="facebook" />
                        </div>
                    </Menu>
                  </Modal> 
                : <></>
            }
        </header>
    );
};

export default Header;