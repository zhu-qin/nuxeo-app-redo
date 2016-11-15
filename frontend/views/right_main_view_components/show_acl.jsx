import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowACL extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getacl(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let aclList;
        if (node.acl) {
            aclList = node.acl.acl[0].ace.map((el, index) => {
                return (
                    <li key={index}>
                        {el.username} : {el.permission}
                    </li>
                )
            });
        }
        return (
            <div className="right-main-view-show-working-button">
                <ul>
                    {aclList}
                </ul>
            </div>
        )
    }
}

module.exports = ShowACL;