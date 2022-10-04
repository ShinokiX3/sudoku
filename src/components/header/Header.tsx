import logo from '../../assets/svg/logo.svg';
import LinkButton from '../../styled/linkButton/LinkButton';
import { Link } from 'react-router-dom';
import styles from './header.module.scss';

type TLink = {
    title: string;
    path: string;
}

const headerLinks: TLink[] = [
    {title: 'Event', path: '/event'},
    {title: 'Awards', path: '/awards'},
    {title: 'Daily Challenge', path: '/dailychallenge'},
    {title: 'Classic', path: 'none'},
    {title: 'Rules', path: '/rules'},
    {title: 'Tips', path: '/tips'},
    {title: 'C', path: '/event'},
];

const Header = () => {
    // Temporary solution
    const handleTheme = () => {
        const body = document.querySelector('body')!;
        if (body.getAttribute('data-theme') === 'light') {
            body.setAttribute('data-theme', 'dark');
        } else body.setAttribute('data-theme', 'light');
    }

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
                    <span style={{cursor: 'pointer'}} onClick={handleTheme}>Theme</span>
                </nav>
            </div>
        </header>
    );
};

export default Header;