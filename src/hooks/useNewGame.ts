import { useDispatch } from 'react-redux';
import { setInitialSudoku } from '../components/playfield/utils/setInitialSudoku';
import { setCurrentField, setDifficulty, setSolvedField, setToInitial } from '../redux/field/slice';

const useNewGame = () => {
    const dispatch = useDispatch();

    const startNewGame = (diff: string) => {
        let gameDiff = 0;

        switch(diff) {
            case 'Easy': gameDiff = 1; break;
            case 'Normal': gameDiff = 2; break;
            case 'Hard': gameDiff = 3; break;
            case 'Expert': gameDiff = 4; break;
            case 'Evil': gameDiff = 5; break;
            default: gameDiff = 2; break;
        }

        const [solvedSudoku, sudoku] = setInitialSudoku(gameDiff);
        // TODO: Make payload optional
        
        dispatch(setToInitial(''));
        dispatch(setSolvedField(solvedSudoku));
        dispatch(setCurrentField(sudoku));
        dispatch(setDifficulty(diff));

        localStorage.removeItem('sudoku');
        localStorage.removeItem('solved');
        localStorage.removeItem('clock');

        localStorage.setItem('difficult', diff)
    }
    
    return [startNewGame];
};

export default useNewGame;