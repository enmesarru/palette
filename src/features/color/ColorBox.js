import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { DragSource, DropTarget } from "react-dnd";
import { useDispatch } from "react-redux";
import { changeBoxColor } from "./colorSlice";

const ItemType = "BOX";

const ColorBox = forwardRef(
  (
    {
      box: { id, name, color },
      isDragging,
      isOver,
      connectDragSource,
      connectDropTarget,
    },
    ref
  ) => {
    const dispatch = useDispatch();

    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));

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
        ref={elementRef}
      >
        {name}
      </div>
    );
  }
);

export default DropTarget(
  ItemType,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = node.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      props.populateColor(dragIndex, hoverIndex);
      monitor.getItem().index = hoverIndex;
    },
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
  })
)(
  DragSource(
    ItemType,
    {
      beginDrag: (props) => ({
        id: props.id,
        index: props.index,
      }),
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(ColorBox)
);
