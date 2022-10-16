import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import styles from './mainlayout.module.scss';

const MainLayout = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            document.querySelector('body')!.setAttribute('data-theme', theme);
        } else {
            document.querySelector('body')!.setAttribute('data-theme', 'light');
        }
    }, []);

    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default MainLayout;