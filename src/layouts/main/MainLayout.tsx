import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/Header';
import styles from './mainlayout.module.scss';

const MainLayout = () => {
    useEffect(() => {
        document.querySelector('body')!.setAttribute('data-theme', 'light');
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