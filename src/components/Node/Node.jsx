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
    mouseup,
    mousedown,
    mouseenter,
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
      onMouseDown={() => mousedown(row, col)}
      onMouseUp={() => mouseup(row, col)}
      onMouseEnter={() => mouseenter(row, col)}
      className={`node ${extraClassName}`}
    ></div>
  );
};

export const DEFAULT_NODE = {};

export default Node;
