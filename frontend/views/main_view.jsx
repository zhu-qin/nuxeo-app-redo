import React from 'react';
import ReactDOM from 'react-dom';
// store
import DocumentStore from '../data/document_store';
// utils
import NuxeoUtils from '../utils/nuxeo_utils.js';

// components
import FileView from './file_view.jsx';
import FileTree from './file_tree.jsx';
import Root from '../data/dummy_data.js';



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
    NuxeoUtils.fetchRepo();
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
        child={this.state.root}
        mainView={this}
        />
      );
    }

    if (this.state.workingFile) {
      workingFile = <FileView mainView={this}/>;
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
