import React from 'react';


import TreeActions from '../actions/tree_actions';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: this.props.node,
      showSubFiles: true
    };
  }

  _getChildren(){
    TreeActions.fetchChildren(this.props.node);
  }

  _setWorkingNode(){
    TreeActions.setWorkingNode(this.props.node);
  }

  _showChildren(e) {
    e.stopPropagation();
    if (this.state.showSubFiles && this.state.currentFile === this.props.mainView.state.workingFile) {
      this.setState({showSubFiles: false});
    } else {
      this.setState({showSubFiles: true});
      if (Object.keys(this.state.currentFile.children).length === 0){
        this._getChildren();
      }
      this._setWorkingNode();
      console.log(TreeActions.getWorkingNode());
      this.props.mainView._setWorkingFile(this.state.currentFile);
    }
  }

  render(){
    let containers = ["Workspace", "Domain", "WorkspaceRoot", "SectionRoot", "TemplateRoot", "Folder"];
    let file = this.state.currentFile;
    let subFiles;
    let showChildren;
    if (this.state.currentFile === this.props.mainView.state.workingFile) {
      showChildren = 'show-working';
    }
    if (this.state.showSubFiles && file) {
      let keys = Object.keys(file.children);
      if (containers.includes(this.state.currentFile.item.type)) {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <FileTree
              node={file.children[childId]}
              mainView={this.props.mainView}
              />
          </li>
        );
      });
    }

    let fileType;

    if (containers.includes(this.state.currentFile.item.type)) {
      fileType = "Workspace";
    } else {
      fileType = "File";
    }

    return (
      <div className={`folder-view`} onClick={this._showChildren.bind(this)}>
         <div className="folder-title-wrapper">
           <div className={`${fileType} ${showChildren}`}>
           </div>
           <div>
             {file.item.title}
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
