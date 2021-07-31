import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { iterateColor, selectPalette } from "./features/color/colorSlice";

import ColorBox from "./features/color/ColorBox";
import ColorBoxGroup from "./features/color/ColorBoxGroup";
import Picker from "./features/sidebar/Picker";
import "./App.css";
import Options from "./features/sidebar/Options";
import GradientView from "./features/color/GradientView";

function App() {
  const palette = useSelector(selectPalette);
  const dispatch = useDispatch();

  const populateColor = (from, to) => {
    dispatch(iterateColor({ from, to }));
  };
  return (
    <div className="container">
      <div className="container__content">
        <div className="boxes">
          {palette.map((a, i) => {
            return (
              <ColorBox
                box={a}
                key={a.id}
                id={i}
                index={i}
                populateColor={populateColor}
              />
            );
          })}
        </div>
        <div className="color_group">
          <GradientView />
          <br />
          <ColorBoxGroup />
        </div>
      </div>
      <div className="container__sidebar">
        <Picker />
        <Options />
      </div>
    </div>
  );
}

export default App;
