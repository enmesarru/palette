import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { setPickedColor } = colorSlice.actions

export const selectPalette = (state) => state.color.palette
export const selectPickedColor = (state) => state.color.pickedColor

export default colorSlice.reducer