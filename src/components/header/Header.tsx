import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

import LinkButton from '../../styled/linkButton/LinkButton';
import logo from '../../assets/svg/logo.svg';
import dark from '../../assets/svg/dark.svg';

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
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    // Temporary solution
    const handleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        const body = document.querySelector('body')!;
        body.setAttribute('data-theme', theme);
    }, [theme])

    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <div className={styles.logo}>
                    <Link to='/'>
                        <img src={logo} alt="sudoku web-app main page  " />
                    </Link>
                </div>
                <nav>{headerLinks.map(({title, path}: TLink) => 
                    <LinkButton path={path} title={title}/>)}
                    <div className={styles.theme} onClick={handleTheme}>
                        <img src={dark} alt="light theme" /> 
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;