import React from "react";
import { useSelector } from "react-redux";
import { selectColorGroups } from "./colorSlice";

export default function GradientView() {
  const selectColors = useSelector(selectColorGroups);

  const gradient = () => {
    const tempColors = [...selectColors];
    if (selectColors.length == 0) return 0;
    if (selectColors.length == 1) return selectColors[0];
    debugger;
    return `linear-gradient(-90deg, 
        ${tempColors
          .reverse()
          .map((x) => x)
          .join(",")})`;
  };

  return (
    <div
      className="color_group__boxes"
      style={{ backgroundImage: gradient(), height: 100 }}
    ></div>
  );
}
