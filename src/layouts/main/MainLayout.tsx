import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from './mainlayout.module.scss';

const MainLayout = () => {
    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            console.log(theme);
            document.querySelector('body')!.setAttribute('data-theme', theme);
        } else {
            document.querySelector('body')!.setAttribute('data-theme', 'light');
        }
    }, [])

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