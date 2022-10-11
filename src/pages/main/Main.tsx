import AppTeaser from '../../components/appteaser/AppTeaser';
import Controls from '../../components/controls/Controls';
import Difficulty from '../../components/difficulty/Difficulty';
import Mistakes from '../../components/mistakes/Mistakes';
import Numbers from '../../components/numbers/Numbers';
import PlayField from '../../components/playfield/PlayField';
import Timer from '../../components/timer/Timer';
import styles from './main.module.scss';

const Main = () => {
    return (
        <div className={styles.main}>
            <div className={styles.plWrapper}>
                <div className={styles.playground}>
                    <div className={styles.gameInfoWrapper}>
                        <Difficulty />
                        <Mistakes />
                        <Timer />
                    </div>
                    <div className={styles.gameWrapper}>
                        <PlayField />
                        <div className={styles.controls}>
                            <Controls />
                            <Numbers />
                        </div>
                    </div>
                </div>
                <aside className={styles.additional}>
                    <AppTeaser />
                </aside>
            </div>
            <div className={styles.info}>
                <h2>Easy Sudoku for beginners</h2> 
                    <p>Easy Sudoku is characterized by the fact that cells contain more numbers than medium or hard ones. It makes this game suitable for beginners and those who have never played Sudoku before.</p>
                    <p>Sudoku is one of the most popular games to develop your intelligence. Supposedly, it was invented in 1970 by Dell's puzzler in New York, who published it in his journal “Mathematical Puzzles and Logical Problems”. The further development to web Sudoku was held in Japan, where the name of the game was invented. In 2004, Sudoku was first published in the “Times” as an online game.</p>
                    <p>Easy Sudoku puzzles not only bring pleasure, but also train concentration and attention. You will notice how quickly your ability to concentrate improves, if you play daily. It is especially useful to play easy web Sudoku on a regular basis for older people in order to maintain their mental abilities for many years.</p>
                    <p>If you have never played this game before, we recommend starting with free easy Sudoku by selecting the appropriate level on Sudoku.com.</p>
                <h2>How to play beginner Sudoku puzzles?</h2>
                    <p>The goal of Sudoku is to fill the cells with numbers from 1 to 9. The numbers are placed in 9 squares, 3x3 each, thus, in each row, in each column and in each small square there are 9 cells. The same digit can be used only once in each separate column, each line and in each small square. The level of difficulty depends on how many digits are already indicated in the cells. If you open plenty of numbers - then you have very easy Sudoku.</p>
                <h2>The advantages of easy web Sudoku</h2>
                    <p>The advantage of online games on Sudoku.com is that the game is always available and you can use various useful features. You can receive hints, correct or delete the entered data, take notes and stop the time needed to solve the puzzle. If you need to interrupt the game, you can always press a pause button.</p>
            </div>
        </div>
    );
};

export default Main;