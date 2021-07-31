import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { interpolationModes } from "../../constant";
import {
  generateBox,
  setInterpolationMode,
  setOptions,
} from "../color/colorSlice";

const optionStyle = { display: "flex", justifyContent: "space-around", padding: 10 }

export default function GridGenerator() {
  const [boxCount, setBoxCount] = useState(2);
  const dispatch = useDispatch();

  const onBoxCountChange = (e) => {
    setBoxCount(parseInt(e.target.value));
  };

  const onInterpolationModeChange = (e) => {
    dispatch(setOptions({ key: "interpolationMode", value: e.target.value }));
  };

  const onGammaChange = (e) => {
    dispatch(setOptions({ key: "gamma", value: e.target.value }));
  };
  return (
    <div>
      <div
        style={optionStyle}
      >
        <span>Box Size ({boxCount})</span>
        <input
          id="boxCount"
          value={boxCount}
          type="range"
          max="500"
          onChange={onBoxCountChange}
        />
        <button onClick={() => dispatch(generateBox(boxCount))}>
          Generate Grid
        </button>
      </div>
      <div style={optionStyle}>
        <span>Interpolation Mode</span>
        <select onChange={onInterpolationModeChange}>
          {interpolationModes.map((mode, index) => (
            <option key={`${index}_mode`}>{mode}</option>
          ))}
        </select>
      </div>
      <div style={optionStyle}>
        <span>Gamma</span>
        <input
          type="range"
          min="0"
          max="2"
          id="gamma"
          step="0.1"
          onChange={onGammaChange}
        />
      </div>
    </div>
  );
}
