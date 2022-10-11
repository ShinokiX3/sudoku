import styles from './switcher.module.scss';
import mistakes from '../../assets/images/mistakes.png';

const Swticher = ({active, setActive}: {active: boolean, setActive: Function}) => {
    const handleSlider = () => {
        setActive(!active);
    }

    return (
        <div onClick={handleSlider} className={styles.wrapper + ` ${active ? styles.active : styles.disable}`}>
            <div className={styles.slider}> <img src={mistakes} alt="mistakes" /> </div>
        </div>
    );
};

export default Swticher;