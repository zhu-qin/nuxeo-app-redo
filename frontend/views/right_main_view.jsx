import React from 'react';

import FileView from './file_view.jsx';

import TreeActions from '../actions/tree_actions.js';
import NuxeoUtils from '../utils/nuxeo_utils';
import DocumentStore from '../data/document_store';

import FolderView from './folder_view';

class RightMainView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    DocumentStore.addListener(this._storeListener.bind(this));
  }

  _storeListener(){
    this.forceUpdate();
  }

  _deleteCurrentFile(node, e){
    e.preventDefault();
    this.props.mainView._setWorkingFile(node.parent);
    TreeActions.deleteDocument(node);
  }

  _fetchAdapter(adapter, e) {
    e.preventDefault();
    let file = this.props.mainView.state.workingFile;
    let success = (res) => {
      console.log(res);
    };
    NuxeoUtils[`get${adapter}`](file, success, success)();
  }


  render() {
    let file = this.props.mainView.state.workingFile;
    let fileProperties = file.item.properties;

    let buttons = ["audit", "children", "acl", "workflow", "task", "op", "bo"].map((adapter) => {
      return (
          <button onClick={this._fetchAdapter.bind(this, adapter)}>
            {adapter}
          </button>
      );
    });

    let propertiesList = Object.keys(fileProperties).map((id) => {
      return (
          <li key={id}>
            {id} : {JSON.stringify(fileProperties[id])}
          </li>
      );
    });

    let docView;
    let containers = ["Workspace", "Domain", "WorkspaceRoot", "SectionRoot", "TemplateRoot", "Folder"];

    if (containers.includes(file.item.type)) {
      docView = (< FolderView mainView={this.props.mainView}/>);
    } else if (file.item.type === "File") {
      docView = (<FileView mainView={this.props.mainView}/>);
    }

    return (
      <div className="file-view-wrapper">
        <button onClick={this._deleteCurrentFile.bind(this, file)} className="submit-button delete-button">Delete Current</button>
        <div>
          {buttons}
        </div>
        <h2>Title: {file.item.title}</h2>
        {propertiesList}
        {docView}
      </div>
    );
  }

}

module.exports = RightMainView;
