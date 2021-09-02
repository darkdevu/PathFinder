import React, { useState } from "react";
import Node from "./Node/Node";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/Dijkstra";
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
  const [mouseIsPressed, setMouseIsPressed] = useState(false);

  const visualDijkstra = () => {
    const Nodes = nodes;
    const startNode = Nodes[START_NODE_ROW][START_NODE_COL];
    const finishNode = Nodes[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(Nodes, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    for (let i = 0; i < visitedNodesInOrder.length; ++i) {
      visitedNodesInOrder[i].isVisited = false;
    }
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  };

  const animateDijkstra = (visitedNodesInOrder, nodesInShortestPathOrder) => {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  const animateShortestPath = (nodesInShortestPathOrder) => {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-shortest-path';
      }, 50 * i);
    }
  }

  const handleMouseDown = (row, col) => {
    // when mouse is entered
    const newGrid = getNewGridWithWallToggled(row, col);
    setMouseIsPressed(true);
    setNodes(newGrid);
  };

  const handleMouseEnter = (row, col) => {
    // When cursor enters a node
    if (!mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(row, col);
    setNodes(newGrid);
  };

  const handleMouseUp = () => {
    // mouse released
    setMouseIsPressed(false);
  };

  const getNewGridWithWallToggled = (row, col) => {
    const newGrid = nodes.slice();
    console.log(row, col);
    const node = newGrid[row][col];
    const newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
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
                const { isStart, isFinish, isVisited, row, col, isWall } = node;
                return (
                  <Node
                    row={row}
                    col={col}
                    key={nodeInd}
                    isStart={isStart}
                    isFinish={isFinish}
                    isVisited={isVisited}
                    handleMouseUp={handleMouseUp}
                    handleMouseEnter={handleMouseEnter}
                    handleMouseDown={handleMouseDown}
                    isWall={isWall}
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
