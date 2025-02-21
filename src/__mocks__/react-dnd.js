module.exports = {
    DndProvider: ({ children }) => children,
    useDrag: () => [{ isDragging: false }, () => {}],
    useDrop: () => [{ isOver: false }, () => {}],
  };