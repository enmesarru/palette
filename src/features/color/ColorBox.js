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

    function contextMenuHandler(e) {
      e.preventDefault();
    }
  
    React.useLayoutEffect(() => {
      elementRef.current.addEventListener('contextmenu', contextMenuHandler)
      return () => {
        elementRef.current.removeEventListener("contextmenu", contextMenuHandler);
      }
    }, [])

    const applyColor = () => dispatch(changeBoxColor({ id }));
    return (
      <div
        className="box"
        style={{
          opacity: isDragging ? 0.2 : 1,
          borderColor: isOver ? "#F5A623" : "",
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

const DndBox = DropTarget(
  ItemType,
  {
    drop(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.decoratedRef.current.getNode();
      if (!node) {
        return null;
      }

      const dragIndex = monitor.getItem().index;
      const hoverIndex = props.index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
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


export default React.memo(DndBox, (prev, next) => {
  return prev.box.color === next.box.color
});
