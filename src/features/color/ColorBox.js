import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { changeBoxColor } from "./colorSlice";

function ColorBox(props) {
  const {
    box: { id, name, color },
  } = props;

  const dispatch = useDispatch();

  const [dragCollectedProps, drag] = useDrag({
    type: "BOX",
    item: { id, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [dropCollectedProps, drop] = useDrop({
    accept: "BOX",
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      draggedItem: monitor.getItem(),
    }),
  });

  function attachBoxRef(el) {
    drag(el);
    drop(el);
  }

  const { isDragging } = dragCollectedProps;
  const { isOver } = dropCollectedProps;

  const applyColor = () => dispatch(changeBoxColor({ id }));

  return (
    <div
      className="box"
      style={{
        transition: "border-color 0.5s",
        opacity: isDragging ? 0.2 : 1,
        borderColor: isOver ? "#F5A623" : "",
        userSelect: "none",
        backgroundColor: color,
      }}
      key={id}
      onDoubleClick={applyColor}
      ref={attachBoxRef}
    >
      {name}
    </div>
  );
}

export default ColorBox;
