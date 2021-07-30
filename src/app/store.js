import { configureStore } from "@reduxjs/toolkit";
import colorReducer from "../features/color/colorSlice";
import { loadState, saveState } from "./storage";


const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    color: colorReducer,
  },
  preloadedState: preloadedState
});

store.subscribe(() => {
  saveState({...store.getState()})
})