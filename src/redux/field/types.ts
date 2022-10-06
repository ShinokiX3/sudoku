import { Field } from "../../components/playfield/types";

export interface FieldSliceState {
    position: number[] | null;
    history: Array<Field[][]> | null;
    current: Field[][] | null;
    solved: number[][] | null;
    numpad: number | null;
    numpadHandle: boolean;
    gameStatus: 'acting' | 'paused' | 'finished';
}