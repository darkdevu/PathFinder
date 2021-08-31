import React, { useEffect, useState } from "react";
import Node from "./Node/Node";
import { dijkstra } from "./Algorithms/Dijkstra";
import { COL_LENGTH, ROW_LENGTH } from "./Constants.js";

import "./visulizer.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const returnGrid = () => {
  const nodes = [];

  for (let row = 0; row < ROW_LENGTH; ++row) {
    const currentRow = [];
    for (let col = 0; col < COL_LENGTH; ++col) {
      currentRow.push(createNode(col, row));
    }
    nodes.push(currentRow);
  }

  return nodes;
};

const Visulizer = () => {
  const [nodes, setNodes] = useState(returnGrid());

  const visualDijkstra = () => {
    const Nodes = nodes;
    const startNode = Nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = Nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedInOrder = dijkstra(Nodes, startNode, finishNode);
    console.log(visitedInOrder);
    for(let i = 0; i < visitedInOrder.length; ++i) {
      visitedInOrder[i].isVisited = false;
    }
    visualDijkstraHelper(visitedInOrder);
  };

  const visualDijkstraHelper = (visitedInOrder) => {
    if(visitedInOrder === undefined) return;
    for(let i = 0; i < visitedInOrder.length; ++i) {
      setTimeout(() => {
        const node = visitedInOrder[i];
        const newGrid = nodes.slice();
        const newNode = {
          ...node,
          isVisited: true
        };
        newGrid[node.row][node.col] = newNode;
        setNodes(newGrid)
      }, 10 * i);
    }
  }; 

  return (
    <div>
      <div>
        <input type="button" onClick={visualDijkstra} />
      </div>
      <div className="grid">
        {nodes.map((row, rowInd) => {
          return (
            <div key={rowInd} className={"nodeContainer"}>
              {row.map((node, nodeInd) => {
                const { isStart, isFinish, isVisited } = node;
                return (
                  <Node
                    key={nodeInd}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    test={"foo"}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Visulizer;
