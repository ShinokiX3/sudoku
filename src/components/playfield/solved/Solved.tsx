import React from 'react';
import styles from './solved.module.scss';
import winscreen from '../../../assets/images/winscreen.png';

import light1 from '../../../assets/images/light1.png';
import light2 from '../../../assets/images/light1.png';
import light3 from '../../../assets/images/light1.png';

import difficulty from '../../../assets/svg/difficulty.svg';
import timer from '../../../assets/svg/timer.svg';
import { useSelector } from 'react-redux';
import { selectDifficult, selectTime } from '../../../redux/field/selectors';
import { formateTime } from '../../timer/utils/formateTime';

const Solved = () => {
    const clock = useSelector(selectTime);
    const difficult = useSelector(selectDifficult);

    return (
        <div className={styles.wrapper}>
            <img className={styles.winscreen} src={winscreen} alt="winscreen" />

            <img className={styles.light1} src={light1} alt="light1" />
            <img className={styles.light2} src={light2} alt="light2" />
            <img className={styles.light3} src={light3} alt="light3" />
            
            <div className={styles.congraz}>
                <p className={styles.excellent}>Excellent!</p>
                <div className={styles.stats}>
                    <div style={{borderBottom: '1px solid #2285e7'}}>
                        <img src={difficulty} alt="difficulty" />
                        <p>Difficulty</p>
                        <p className={styles.statsValue}>{difficult}</p>
                    </div>
                    <div>
                        <img src={timer} alt="timer" />
                        <p>Time</p>
                        <p className={styles.statsValue}>{formateTime(clock)}</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Solved;