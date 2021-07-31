import React from "react";
import { useSelector } from "react-redux";
import { selectColorGroups } from "./colorSlice";

export default function ColorBoxGroup() {
  const selectColors = useSelector(selectColorGroups);
  return (
    <div className="color_group__boxes">
      {selectColors.map((color, i) => (
        <div style={{ backgroundColor: color }}>{color}</div>
      ))}
    </div>
  );
}
