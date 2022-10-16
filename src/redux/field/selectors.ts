import { RootState } from '../store';

export const selectCurrent = (state: RootState) => state.field.current;
export const selectSolved = (state: RootState) => state.field.solved;
export const selectNumpad = (state: RootState) => state.field.numpad;
export const selectPosition = (state: RootState) => state.field.position;
export const selectNumpadHandle = (state: RootState) => state.field.numpadHandle;
export const selectGameStatus = (state: RootState) => state.field.gameStatus;
export const selectTime = (state: RootState) => state.field.clock;
export const selectDifficult = (state: RootState) => state.field.difficult;
export const selectNoteStatus = (state: RootState) => state.field.notesStatus;
export const selectMistakesAC = (state: RootState) => state.field.mistakesAutoCheck;
