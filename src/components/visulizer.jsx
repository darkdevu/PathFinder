import React, { Component } from "react";
import Node from "./Node/Node";

import "./visulizer.css";

class Visulizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    const nodes = [];

    for (let row = 0; row < 20; ++row) {
      const currentRow = [];
      for (let col = 0; col < 50; ++col) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
        };
        currentRow.push(currentNode);
      }
      nodes.push(currentRow);
    }

    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;
    console.log(nodes);
    return (
      <div className="grid">
        {nodes.map((row, rowInd) => {
          return (
            <div key={rowInd} className={"nodeContainer"}>
              {row.map((node, nodeInd) => {
                const { isStart, isFinish } = node;
                return (
                  <Node
                    key={nodeInd}
                    isStart={isStart}
                    isFinish={isFinish}
                    test={"foo"}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Visulizer;
