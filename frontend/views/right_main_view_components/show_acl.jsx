import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowACL extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getacl(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let string = JSON.stringify(node.acl);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowACL;