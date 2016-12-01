import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class ShowTask extends React.Component {
    constructor(props){
        super(props);
        TreeActions.gettask(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let string = JSON.stringify(node.task);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowTask;