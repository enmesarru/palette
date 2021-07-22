import { createSlice } from "@reduxjs/toolkit";
import chroma from "chroma-js";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  palette: [],
  pickedColor: "",
};

export const colorSlice = createSlice({
  name: "color",
  initialState: initialState,
  reducers: {
    setPickedColor: (state, action) => {
      state.pickedColor = action.payload;
    },
    generateBox: (state, action) => {
      state.palette = Array(action.payload)
        .fill(0)
        .map((v, index) => ({ id: uuidv4(), name: index, color: "" }));
    },
    changeBoxColor(state, action) {
      const { id } = action.payload;
      state.palette[state.palette.findIndex((x) => x.id === id)].color =
        state.pickedColor.hex;
    },
    iterateColor(state, action) {
      const { from, to } = action.payload;

      const startTone = state.palette[from].color;
      const endTone = state.palette[to].color;

      if (!!(startTone && endTone)) {
        const colors = chroma
          .scale([startTone, endTone])
          .mode("lch")
          .colors(Math.abs(from - to));

        let count = 0;
        state.palette.forEach((x) => {
          if (from < x.name && x.name < to) {
            x.color = colors[count];
            count++;
          }
        });
      }
    },
  },
});

export const { setPickedColor, generateBox, changeBoxColor, iterateColor } =
  colorSlice.actions;

export const selectPalette = (state) => state.color.palette;
export const selectPickedColor = (state) => state.color.pickedColor;

export default colorSlice.reducer;
