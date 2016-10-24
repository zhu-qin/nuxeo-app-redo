import React from 'react';
import ReactDOM from 'react-dom';

import CreateFolder from './create_folder.jsx';
import UploadForm from './upload_form.jsx';

import NuxeoUtils from '../utils/nuxeo_utils';
import DocumentStore from '../data/document_store';


class FileView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    DocumentStore.addListener(this._storeListener.bind(this));
  }

  _storeListener(){
    this.forceUpdate();
  }

  _deleteFile(node, e){
    e.preventDefault();
    NuxeoUtils.deleteDocument(node);
  }

  _setWorkingFile(node, e){
    e.preventDefault();
    this.props.mainView._setWorkingFile(node);
    NuxeoUtils.fetchChildren(node);
  }

  render() {
    let file = this.props.mainView.state.workingFile;
    let childNodes = this.props.mainView.state.workingFile.children;
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
    let createDocs;
    if (file.item.type === "Workspace") {
      createDocs = (
        <div>
          <CreateFolder mainView={this.props.mainView} />
          <UploadForm mainView={this.props.mainView} />
          <h3>Sub-files & Folders</h3>
          <ul>
            {list}
          </ul>
        </div>
      );
    }

    return (
      <div className="file-view-wrapper">
        <h2>Title: {file.item.title}</h2>
        {createDocs}
      </div>
    );
  }

}

module.exports = FileView;
