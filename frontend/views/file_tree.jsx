import React from 'react';
import ReactDOM from 'react-dom';

import NuxeoUtils from '../utils/nuxeo_utils';

class FileTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: this.props.child,
      showSubFiles: false,
      folder: ["Collection", "Workspace", "Favorites"]
    };
  }

  _getChildren(){
    NuxeoUtils.fetchChildren(this.state.currentFile);
  }

  _showChildren(e) {
    e.stopPropagation();
    if (this.state.showSubFiles && this.state.currentFile === this.props.mainView.state.workingFile) {
      this.setState({showSubFiles: false});
    } else {
      this.setState({showSubFiles: true});
      this._getChildren();
      this.props.mainView._setWorkingFile(this.state.currentFile);
    }
  }

  render(){
    let file = this.state.currentFile;
    let subFiles;
    let showChildren;
    if (this.state.currentFile === this.props.mainView.state.workingFile) {
      showChildren = 'show-working';
    }
    if (this.state.showSubFiles && file) {
      let keys = Object.keys(file.children);
      if (this.state.folder.includes(this.state.currentFile.item.type)) {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <FileTree
              child={file.children[childId]}
              mainView={this.props.mainView}
              />
          </li>
        );
      });
    }

    let fileType;
    if (this.state.currentFile.item.type != "Workspace") {
      fileType = "File";
    } else {
      fileType = "Workspace";
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
