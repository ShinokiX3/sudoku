import { useDispatch } from 'react-redux';
import { setGameStatus } from '../../../redux/field/slice';
import styles from './paused.module.scss';

import { circle } from '../../../assets/svg/controls';
import Game from '../game/Game';

const Paused = () => {
    const dispatch = useDispatch();

    const handlePause = () => {
        dispatch(setGameStatus('acting'));
    }

    return (
        <div className={styles.parent}>
            <Game />
            <div onClick={handlePause} className={styles.wrapper}>
                <img src={circle} alt="unpause" />
            </div>
        </div>
    );
};

export default Paused;