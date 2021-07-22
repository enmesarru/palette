import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { iterateColor, selectPalette } from "./features/color/colorSlice";

import ColorBox from "./features/color/ColorBox";
import Picker from "./features/sidebar/Picker";
import "./App.css";
import GridGenerator from "./features/sidebar/GridGenerator";

function App() {
  const palette = useSelector(selectPalette);
  const dispatch = useDispatch();

  const populateColor = (from, to) => {
    dispatch(iterateColor({from, to}))
  }
  return (
    <div className="container">
      <div className="container__content">
        {palette.map((a, i) => {
          return <ColorBox box={a} key={a.id} id={i} index={i} populateColor={populateColor} />;
        })}
      </div>
      <div className="container__sidebar">
        <Picker />
        <GridGenerator />
      </div>
    </div>
  );
}

export default App;
