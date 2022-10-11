import { Field } from "../../components/playfield/types";
import { TTimer } from "../../components/timer/types";

export interface FieldSliceState {
    position: number[] | null;
    history: Array<Field[][]> | null;
    current: Field[][] | null;
    solved: number[][] | null;
    numpad: number | null;
    clock: TTimer;
    difficult: 'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Evil';
    gameStatus: 'acting' | 'paused' | 'finished';
    numpadHandle: boolean;
    notesStatus: boolean;
    mistakesAutoCheck: boolean;
}