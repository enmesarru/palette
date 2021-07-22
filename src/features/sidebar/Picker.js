import React from "react";
import { SketchPicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { selectPickedColor, setPickedColor } from "../color/colorSlice";

export default function Picker() {
  const dispatch = useDispatch();
  const pickedColor = useSelector(selectPickedColor);

  return (
    <SketchPicker
      color={pickedColor}
      onChange={(color, e) => dispatch(setPickedColor(color))}
    />
  );
}
