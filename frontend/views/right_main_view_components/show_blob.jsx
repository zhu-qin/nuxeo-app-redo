import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowBlob extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getblob(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let urlString;
        if (node.blob) {
            urlString = node.blob.url;
        }
        return (
            <div className="right-main-view-show-working-button">
                {urlString}
            </div>
        )
    }
}

module.exports = ShowBlob;