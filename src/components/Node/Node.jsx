import React, { Component } from "react";

import "./Node.css";

const Node = (props) => {
  const { isStart, isFinish, isVisited } = props;

  const extraClassName = isFinish
    ? "node-finish"
    : isStart
    ? "node-start"
    : isVisited
    ? "node-processed"
    : "";

  return <div className={`node ${extraClassName}`}></div>;
};

export const DEFAULT_NODE = {};

export default Node;
