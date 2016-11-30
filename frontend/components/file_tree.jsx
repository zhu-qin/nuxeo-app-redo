import React from 'react';
import TreeActions from '../actions/tree_actions';
import DocumentTypeConstants from '../constants/document_type_constants';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
  }

  _showChildren(e) {
    e.stopPropagation();
    TreeActions.toggleShowChildren(this.props.node, this.forceUpdate.bind(this));
  }

  render(){
    let workingNode = TreeActions.getWorkingNode();
    let node = this.props.node;
    let containers = DocumentTypeConstants.containers.concat(DocumentTypeConstants.defaultContainers);
    let subFiles;
    let showChildren;
    let highlightWorking;
    if (workingNode === node) {
      highlightWorking = 'highlight-working';
    }

    if (node.showChildren) {
      let keys = Object.keys(node.children);
      if (containers.includes(node.item.type)) {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <FileTree node={node.children[childId]} />
          </li>
        );
      });
    }

    let title;
    if (node.item.type === 'Root') {
      title = "Root";
    } else {
      title = node.item.title;
    }

    return (
      <div className={`file-tree-view`} >
           <div className="file-tree-title-wrapper" onClick={this._showChildren.bind(this)}>
             <div className={`${node.item.type} ${showChildren}`}></div>
             <div className={`file-tree-title ${highlightWorking}`} >
               {title}
             </div>
           </div>
        <ul>
          {subFiles}
        </ul>
      </div>
    );
  }
}

module.exports = FileTree;
