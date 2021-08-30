import React, { Component } from "react";

import "./Node.css";

class Node extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {isStart, isFinish} = this.props;
        console.log(isStart, isFinish);
        const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';

        return (
            <div className={`node ${extraClassName}`}>
                
            </div>
        )
    }
}

export const DEFAULT_NODE = {

}

export default Node