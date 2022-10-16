import { useSelector } from 'react-redux';
import { selectDifficult, selectTime } from '../../../redux/field/selectors';
import { formateTime } from '../../timer/utils/formateTime';
import styles from './solved.module.scss';

import { winscreen, light } from '../../../assets/images/game';
import { difficulty, timer } from '../../../assets/svg/controls';

const Solved = () => {
    const clock = useSelector(selectTime);
    const difficult = useSelector(selectDifficult);

    return (
        <div className={styles.wrapper}>
            <img className={styles.winscreen} src={winscreen} alt="winscreen" />

            <img className={styles.light1} src={light} alt="light1" />
            <img className={styles.light2} src={light} alt="light2" />
            <img className={styles.light3} src={light} alt="light3" />
            
            <div className={styles.congraz}>
                <p className={styles.excellent}>Excellent!</p>
                <div className={styles.stats}>
                    <div className={styles.diffborder}>
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