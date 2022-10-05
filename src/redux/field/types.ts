import { Field } from "../../components/playfield/types";

export interface FieldSliceState {
    history: Array<Field[][]> | null;
    current: Field[][] | null;
    solved: Field[][] | null;
    numpad: [] | null;
}