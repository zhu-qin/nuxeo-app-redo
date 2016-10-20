import React from 'react';
import ReactDOM from 'react-dom';
// store
import DocumentStore from '../data/document_store';
// utils
import NuxeoUtils from '../utils/nuxeo_utils.js';

// components
import FileView from './file_view.jsx';
import Folder from './folder.jsx';
import Root from '../data/dummy_data.js';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: DocumentStore.getUser(),
      root: Root,
      workingFile: undefined,
    };
  }

  componentDidMount() {
    DocumentStore.addListener(this.storeListener.bind(this));
    NuxeoUtils.getDocuments();
  }

  _setWorkingFile(file) {
    this.setState({workingFile: file});
  }

  _addFile() {
    this.setState({createFile: true});
  }

  storeListener() {
    this.setState({documents: DocumentStore.all()});
  }

  render() {
    return (
      <div className="main-wrapper">
        <div className="side-panel-wrapper">
          <div className="side-panel-profile">
            {this.state.user.id}
          </div>
        <Folder
          child={this.state.root}
          mainView={this}
          />
        </div>
        <FileView workingFile={this.state.workingFile}/>
      </div>
    );
  }

}

module.exports = MainView;
