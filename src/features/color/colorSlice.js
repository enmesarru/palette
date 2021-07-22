import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  palette: [],
  pickedColor: ''
};

export const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    setPickedColor: (state, action) => {
      state.pickedColor = action.payload;
    },
    generateBox: (state, action) => {
      state.palette = Array(action.payload).fill(0).map((v, index) => ({id: uuidv4(), name: index }))
    }
  },
});

export const { setPickedColor, generateBox } = colorSlice.actions

export const selectPalette = (state) => state.color.palette
export const selectPickedColor = (state) => state.color.pickedColor

export default colorSlice.reducer