import { RootState } from '../store';

export const selectCurrent = (state: RootState) => state.field.current;
export const selectSolved = (state: RootState) => state.field.solved;
export const selectNumpad = (state: RootState) => state.field.numpad;
export const selectPosition = (state: RootState) => state.field.position;
export const selectNumpadHandle = (state: RootState) => state.field.numpadHandle;
export const selectGameStatus = (state: RootState) => state.field.gameStatus;