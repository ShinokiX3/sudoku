import { createSlice } from "@reduxjs/toolkit";
import { FieldSliceState } from "./types";

const initialState: FieldSliceState = {
    history: null,
    current: null,
    solved: null,
    numpad: null
}

const fieldSlice = createSlice({
    name: 'field',
    initialState,
    reducers: {
        setCurrentField(state, action) {
            state.current = action.payload;
            state.history = state.history ? [...state.history, action.payload] : [action.payload];
        },
        setSolvedField(state, action) {
            state.solved = action.payload;
        },
        undoField(state, action) {
            if (state.history && state.current && state.history.length > 1) {
                state.history = [...state.history.slice(0, state.history.length - 1)];
                state.current = state.history[state.history.length - 1];
            }
        }
    }
})

export const { setCurrentField, setSolvedField, undoField } = fieldSlice.actions;
export default fieldSlice.reducer;