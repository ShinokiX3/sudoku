import { createSlice } from "@reduxjs/toolkit";
import { FieldSliceState } from "./types";

const initialState: FieldSliceState = {
    position: null,
    history: null,
    current: null,
    solved: null,
    numpad: null,
    difficult: 'Hard',
    clock: {minutes: 0, seconds: 0},
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
            state.difficult = 'Hard';
            state.clock = {minutes: 0, seconds: 0};
            state.numpadHandle = false;
            state.gameStatus = 'acting';
        },
        restartGame(state, action) {
            if (state.history && state.current) {
                state.current = state.history[1];
                state.history = [...state.history.slice(0, 2)];
            }
        },
        setTime(state, action) {
            state.clock = action.payload;
        },
        setDifficulty(state, action) {
            state.difficult = action.payload;
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
    restartGame,
    setTime,
    setDifficulty
} = fieldSlice.actions;

export default fieldSlice.reducer;