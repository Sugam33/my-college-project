import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    // Add reducers here
});

// initialState
const initialState = {};

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: initialState,
});