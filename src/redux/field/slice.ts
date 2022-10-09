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
            if (state.history && state.current && state.history.length > 2) {
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
        },
        setToInitial(state, action) {
            state.position = null;
            state.history = null;
            state.current = null;
            state.solved = null;
            state.numpad = null;
            state.numpadHandle = false;
            state.gameStatus = 'acting';
        },
        restartGame(state, action) {
            if (state.history && state.current) {
                state.current = state.history[1];
                state.history = [...state.history.slice(0, 2)];
            }
        }
    }
})

export const { 
    setCurrentField, 
    setSolvedField, 
    undoField, 
    setNumpad, 
    setPosition, 
    setGameStatus, 
    setToInitial,
    restartGame
} = fieldSlice.actions;

export default fieldSlice.reducer;