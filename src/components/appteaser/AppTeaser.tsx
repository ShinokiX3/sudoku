import React from 'react';
import styles from './appteaser.module.scss';

import app from '../../assets/images/icon-app.png';
import apple from '../../assets/images/apple.png';
import google from '../../assets/images/google.png';

const AppTeaser = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <img src={app} alt="app" />
                <div>
                    <p>Sudoku.com - Number Games</p>
                    <p className={styles.title}>Easybrain</p>
                    <span>Stars</span>
                </div>
            </div>
            <div className={styles.links}>
                <a href="https://app.adjust.com/4j48k9v">
                    <img src={google} alt="google" />
                </a>
                <a href="https://app.adjust.com/ver8rks">
                    <img src={apple} alt="apple" />
                </a>
            </div>
        </div>
    );
};

export default AppTeaser;