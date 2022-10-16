import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGameStatus, setTime } from '../../redux/field/slice';
import { selectGameStatus, selectTime } from '../../redux/field/selectors';
import { TTimer } from './types';
import styles from './timer.module.scss';

import { play, pause } from '../../assets/images/game';
import { formateTime } from './utils/formateTime';

const Timer = () => {
    const [clock, setClock] = useState<TTimer>({minutes: 0, seconds: 0});

    const dispatch = useDispatch();
    const status = useSelector(selectGameStatus);
    const reduxClock = useSelector(selectTime);

    useEffect(() => {
        const clock = localStorage.getItem('clock');
        if (clock) {
            setClock(JSON.parse(clock));
            dispatch(setTime(JSON.parse(clock)))
        }
    }, []);

    useEffect(() => {
        const lsClock = localStorage.getItem('clock');
        if (!lsClock) {
            setClock({minutes: 0, seconds: 0});
        }
    }, [reduxClock]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setClock((clock) => {
                localStorage.setItem('clock', JSON.stringify(clock));
                if (clock.seconds + 1 === 60) return {minutes: clock.minutes + 1, seconds: 0};
                return {minutes: clock.minutes, seconds: clock.seconds + 1}
            });
        }, 1000);
        
        if (status === 'paused') clearInterval(intervalId);

        if (status === 'finished') {
            clearInterval(intervalId);
            dispatch(setTime(clock));
        }

        return () => {
            clearInterval(intervalId);
        }
    }, [status]);

    const handleGameStatus = () => {
        dispatch(setGameStatus(status === 'acting' ? 'paused' : 'acting'));
    }

    return (
        <div onClick={handleGameStatus} className={styles.wrapper + ` ${status === 'finished' ? styles.disable : ''}`}>
            <p>{formateTime(clock)}</p>
            <img src={status === 'acting' ? play : pause} alt="play" />
        </div>
    );
};

export default Timer;