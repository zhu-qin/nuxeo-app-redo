import React from 'react';
import TreeActions from '../actions/tree_actions';

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
    let containers = ["Root", "Workspace", "Domain", "WorkspaceRoot", "SectionRoot", "TemplateRoot", "Folder"];
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
      <div className={`folder-view`} onClick={this._showChildren.bind(this)}>
         <div className="folder-title-wrapper">
           <div className={`${node.item.type} ${showChildren}`}></div>
           <div className={highlightWorking}>
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
