import React, { Component } from "react";

import "./Node.css";

const Node = (props) => {
  const {
    isWall,
    row,
    col,
    isStart,
    isFinish,
    isVisited,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
  } = props;

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isVisited
    ? "node-visited"
    : isWall
    ? "node-wall"
    : "";

  return (
    <div
      id={`node-${row}-${col}`}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
      className={`node ${extraClassName}`}
    ></div>
  );
};

export const DEFAULT_NODE = {};

export default Node;
