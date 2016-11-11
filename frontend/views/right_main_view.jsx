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

  // componentDidMount(){
  //   DocumentStore.addListener(this._storeListener.bind(this));
  // }
  //
  // _storeListener(){
  //   this.forceUpdate();
  // }

  _deleteCurrentFile(node, e){
    e.preventDefault();
    TreeActions.setWorkingNode(node.parent);
    TreeActions.deleteDocument(node);
  }

  // _fetchAdapter(adapter, e) {
  //   e.preventDefault();
  //   let file = this.props.mainView.state.workingFile;
  //   let success = (res) => {
  //     console.log(res);
  //   };
  //   NuxeoUtils[`get${adapter}`](file, success, success)();
  // }


  render() {
    let node = this.props.workingNode;
    let fileProperties = node.item.properties;

    let propertiesList = Object.keys(fileProperties).map((id) => {
      return (
          <li key={id}>
            {id} : {JSON.stringify(fileProperties[id])}
          </li>
      );
    });

    let docView;
    let containers = ["Workspace", "Domain", "WorkspaceRoot", "SectionRoot", "TemplateRoot", "Folder"];

    if (containers.includes(node.item.type)) {
      docView = (< FolderView workingNode={this.props.workingNode}/>);
    } else if (node.item.type === "File") {
      docView = (<FileView workingNode={this.props.workingNode}/>);
    }

    return (
      <div className="file-view-wrapper">
        <button onClick={this._deleteCurrentFile.bind(this, node)} className="submit-button delete-button">Delete Current</button>
        <h2>Title: {node.item.title}</h2>
        {propertiesList}
        {docView}
      </div>
    );
  }

}

module.exports = RightMainView;
