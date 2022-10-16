import { TCell } from "../../components/playfield/types";
import { TTimer } from "../../components/timer/types";

export interface FieldSliceState {
    position: number[] | null;
    history: Array<TCell[][]> | null;
    current: TCell[][] | null;
    solved: number[][] | null;
    numpad: number | null;
    clock: TTimer;
    difficult: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Evil';
    gameStatus: 'acting' | 'paused' | 'finished';
    numpadHandle: boolean;
    notesStatus: boolean;
    mistakesAutoCheck: boolean;
}