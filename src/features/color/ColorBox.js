import React from "react";
import { useDrag, useDrop } from "react-dnd";

function ColorBox(props) {
  const [dragCollectedProps, drag] = useDrag({
    type: 'BOX',
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  });

  const [dropCollectedProps, drop] = useDrop({
    accept: 'BOX',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  function attachBoxRef(el) {
    drag(el);
    drop(el);
  }

  const {isDragging} = dragCollectedProps
  const {isOver} = dropCollectedProps
  const { val } = props;

  return (
    <div className="box" style={{ opacity: isDragging ? 0.2 : 1, borderColor: isOver ? 'yellow': ''}} ref={attachBoxRef}>
      {val}
    </div>
  );
}

export default ColorBox;
