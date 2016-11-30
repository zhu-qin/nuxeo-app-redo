import React from 'react';
import TreeActions from '../../actions/tree_actions';

class FolderView extends React.Component {
    constructor(props) {
        super(props);
    }

    _deleteFile(node, e){
        e.preventDefault();
        TreeActions.deleteDocument(node);
    }

    _setWorkingFile(node, e){
        e.preventDefault();
        TreeActions.setWorkingNode(node);
        TreeActions.fetchChildren(node);
    }

    render() {
        let file = TreeActions.getWorkingNode();
        let fileProperties = file.item.properties;
        let childNodes = file.children;
        let list = Object.keys(childNodes).map((id) => {
            return (
                <li key={id} className="file-view-list-item">
                    <button onClick={this._deleteFile.bind(null, childNodes[id])} className="submit-button delete-button">Delete</button>
                    <div onClick={this._setWorkingFile.bind(this, childNodes[id])}>
                        {childNodes[id].item.title}
                    </div>
                </li>
            );
        });

        return (
            <div className="file-view-wrapper">
                <h3>Sub-files & Folders</h3>
                <ul>
                    {list}
                </ul>
            </div>
        );
    }
}

module.exports = FolderView;
