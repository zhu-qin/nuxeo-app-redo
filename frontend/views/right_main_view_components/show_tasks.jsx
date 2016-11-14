import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowTasks extends React.Component {
    constructor(props){
        super(props);
        TreeActions.gettasks(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let string = JSON.stringify(node.tasks);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowTasks;