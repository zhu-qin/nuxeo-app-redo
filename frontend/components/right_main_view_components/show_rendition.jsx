import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class ShowRendition extends React.Component {
    constructor(props){
        super(props);
        TreeActions.getrendition(this.props.workingNode);
    }

    render() {
        let node = this.props.workingNode;
        let urlString;
        if (node.rendition) {
            urlString = node.rendition.url;
        }
        return (
            <div className="right-main-view-show-working-button">
                <img src={urlString} />
            </div>
        )
    }
}

module.exports = ShowRendition;