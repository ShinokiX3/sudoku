import { RootState } from '../store';

export const selectCurrent = (state: RootState) => state.field.current;
export const selectSolved = (state: RootState) => state.field.solved;