import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { generateBox } from "../color/colorSlice";

export default function GridGenerator() {
  const [boxCount, setBoxCount] = useState(10)
  const dispatch = useDispatch()

  const onBoxCountChange = (e) => {
    setBoxCount(parseInt(e.target.value))
  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-around', padding: 10}}>
        <span>Box Size ({boxCount})</span>
        <input id="boxCount" value={boxCount} type="range" max="500" onChange={onBoxCountChange} />
        <button onClick={() => dispatch(generateBox(boxCount))}>Generate Grid</button>
      </div>
      <div></div>
    </div>
  );
}
