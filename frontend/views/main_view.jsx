import React from 'react';
// store
import DocumentStore from '../data/document_store.js';
// actions
import TreeActions from '../actions/tree_actions.js';

// components
import RightMainView from './right_main_view.jsx';
import FileTree from './file_tree.jsx';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: DocumentStore.getUser(),
      root: undefined,
      workingFile: undefined,
    };
  }

  componentDidMount() {
    DocumentStore.addListener(this.storeListener.bind(this));
    TreeActions.fetchRoot();
  }

  _setWorkingFile(file) {
    this.setState({ workingFile: file });
  }

  storeListener() {
    this.setState({root: DocumentStore.getRoot()});
  }

  render() {
    let folder;
    let workingFile;
    if (this.state.root) {
      folder = (
        <FileTree
        node={this.state.root}
        mainView={this}
        />
      );
    }

    if (this.state.workingFile) {
      workingFile = <RightMainView mainView={this}/>;
    }

    return (
      <div className="main-wrapper">
        <div className="side-panel-wrapper">
          <div className="side-panel-profile">
            {this.state.user.id}
          </div>
          {folder}
        </div>
        {workingFile}
      </div>
    );
  }

}

module.exports = MainView;
