import { createSlice } from "@reduxjs/toolkit";
import { FieldSliceState } from "./types";

const initialState: FieldSliceState = {
    position: null,
    history: null,
    current: null,
    solved: null,
    numpad: null,
    numpadHandle: false,
    gameStatus: 'acting'
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
        },
        setPosition(state, action) {
            state.position = action.payload;
        },
        setNumpad(state, action) {
            state.numpadHandle = !state.numpadHandle;
            state.numpad = action.payload;
        },
        setGameStatus(state, action) {
            state.gameStatus = action.payload;
        }
    }
})

export const { setCurrentField, setSolvedField, undoField, setNumpad, setPosition, setGameStatus } = fieldSlice.actions;
export default fieldSlice.reducer;