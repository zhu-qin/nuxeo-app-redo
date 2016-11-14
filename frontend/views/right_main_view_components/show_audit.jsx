import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowAudit extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getaudit(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let string = JSON.stringify(node.audit);
        return (
            <div className="right-main-view-show-working-button">
                {string}
            </div>
        )
    }
}

module.exports = ShowAudit;