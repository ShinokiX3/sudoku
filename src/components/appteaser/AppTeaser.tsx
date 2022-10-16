import styles from './appteaser.module.scss';

import app from '../../assets/images/advert/icon-app.png';
import { apple, google } from '../../assets/images/social';

const googleUrl = 'https://app.adjust.com/4j48k9v';
const appleUrl = 'https://app.adjust.com/ver8rks';

const AppTeaser = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.info}>
                <img src={app} alt="app" />
                <div>
                    <p>Sudoku.com - Number Games</p>
                    <p className={styles.title}>Easybrain</p>
                    <span>★★★★★</span>
                </div>
            </div>
            <div className={styles.links}>
                <a href={googleUrl}>
                    <img src={google} alt="google" />
                </a>
                <a href={appleUrl}>
                    <img src={apple} alt="apple" />
                </a>
            </div>
        </div>
    );
};

export default AppTeaser;