import React from 'react';
import ReactDOM from 'react-dom';


class Folder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentFile: this.props.child,
      showSubFiles: false
    };
  }

  _showChildren(e) {
    e.stopPropagation();
    if (this.state.showSubFiles) {
      this.setState({showSubFiles: false});
    } else {
      this.setState({showSubFiles: true});
    }
    if (this.state.currentFile.item.type === 'file') {
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
      if (this.state.currentFile.item.type === 'folder') {
        showChildren = 'show-children';
      }
      subFiles = keys.map((childId) => {
        return (
          <li key={childId}>
            <Folder
              child={file.children[childId]}
              mainView={this.props.mainView}
              />
          </li>
        );
      });
    }


    return (
      <div className={`folder-view`}
         onClick={this._showChildren.bind(this)}
         >
         <div className="folder-title-wrapper">
           <div className={`${this.state.currentFile.item.type} ${showChildren}`}>
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

module.exports = Folder;
