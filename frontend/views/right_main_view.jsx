import React from 'react';
import TreeActions from '../actions/tree_actions.js';

// components
import FileView from './right_main_view_components/file_view.jsx';
import FolderView from './right_main_view_components/folder_view.jsx';

import CreateDocumentForm from './right_main_view_components/create_document_form.jsx';
import ShowACL from './right_main_view_components/show_acl.jsx';
import ShowAudit from './right_main_view_components/show_audit.jsx';
import ShowTask from './right_main_view_components/show_task.jsx';
import ShowWorkFlow from './right_main_view_components/show_workflow.jsx';
import ShowBlob from './right_main_view_components/show_blob.jsx';
import ShowRendition from './right_main_view_components/show_rendition.jsx';

import AttachFile from './right_main_view_components/attach_file.jsx';
import EditDocument from './right_main_view_components/edit_document.jsx'

import DocumentTypeConstants from '../constants/document_type_constants';

const workingButtons = {
  "Create Document": CreateDocumentForm,
  "ACL": ShowACL,
  "Work Flow": ShowWorkFlow,
  "Tasks": ShowTask,
  "Audit": ShowAudit,
  "Blob": ShowBlob,
  "Rendition": ShowRendition,
  "Attach File": AttachFile,
  "Edit": EditDocument
};

const showWorkingButtons = ['ACL', 'Work Flow', 'Tasks', 'Audit', 'Edit'];

const containers = DocumentTypeConstants.containers.concat(DocumentTypeConstants.defaultContainers);

class RightMainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showWorkingButton: undefined
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.workingNode != this.props.workingNode) {
      this.setState({showWorkingButton: undefined});
    }
  }

  _deleteCurrentFile(node, e){
    e.preventDefault();
    TreeActions.setWorkingNode(node.parent);
    TreeActions.deleteDocument(node);
  }

  _setWorkingButton(buttonText, e){
    if (this.state.showWorkingButton === buttonText) {
      this.setState({showWorkingButton: undefined});
    } else {
      this.setState({showWorkingButton: buttonText});
    }
  }

  render() {
    let node = this.props.workingNode;
    let fileProperties = node.item.properties;

    let propertiesList = (
        <div>
          Creator : {fileProperties["dc:creator"]} <br/>
          Last Contributor : {fileProperties["dc:lastContributor"]} <br/>
          Created At : {new Date(fileProperties["dc:created"]).toString()} <br/>
          Modified At : {new Date(fileProperties["dc:modified"]).toString()}
        </div>
    );

    let buttonList = showWorkingButtons.map((button) => {
      return (
        <button key={button} onClick={this._setWorkingButton.bind(this,`${button}`)} className="submit-button">{`${button}`}</button>
      );
    });

    let showWorking;

    if (this.state.showWorkingButton) {
      let props = {
        workingNode:node,
        _setWorkingButton: this._setWorkingButton
      };
      showWorking = React.createElement(workingButtons[this.state.showWorkingButton], props);
    }

    let title;
    if (node.item.type === 'root'){
      title = "Root";
    } else {
      title = node.item.title;
    }

    let fileOrFolderView;
    let attachFileOrCreate;
    if (containers.includes(node.item.type)){
      attachFileOrCreate = <button onClick={this._setWorkingButton.bind(this,"Create Document")} className="submit-button">Create Document</button>
      fileOrFolderView = <FolderView workingNode={this.props.workingNode}/>;
    } else {
      attachFileOrCreate = <button onClick={this._setWorkingButton.bind(this,"Attach File")} className="submit-button">Attach File</button>;
      fileOrFolderView = <FileView workingNode={this.props.workingNode} />;
    }

    return (
      <div>
        <h2>Title: {title}</h2>
        <div className="right-main-view-button-wrapper">
          {attachFileOrCreate}
          {buttonList}
          <button onClick={this._deleteCurrentFile.bind(this, node)} className="submit-button delete-button">Delete Current</button>
        </div>
        {showWorking}
        <div className="right-main-view-properties">
          {propertiesList}
        </div>
        {fileOrFolderView}
      </div>
    );
  }

}

module.exports = RightMainView;
