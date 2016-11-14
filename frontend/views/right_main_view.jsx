import React from 'react';
import TreeActions from '../actions/tree_actions.js';

// components
import FileView from './file_view.jsx';
import FolderView from './folder_view.jsx';

import CreateDocumentForm from './right_main_view_components/create_document_form.jsx';
import ShowACL from './right_main_view_components/show_acl.jsx';
import ShowAudit from './right_main_view_components/show_audit.jsx';
import ShowTask from './right_main_view_components/show_task.jsx';
import ShowWorkFlow from './right_main_view_components/show_workflow.jsx';
import ShowBlob from './right_main_view_components/show_blob.jsx';

const workingButtons = {
  "Create Document": CreateDocumentForm,
  "ACL": ShowACL,
  "Work Flow": ShowWorkFlow,
  "Tasks": ShowTask,
  "Audit": ShowAudit,
  "Blob": ShowBlob
};

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

    let propertiesList = ["dc:creator", "dc:lastContributor", "dc:created", "dc:modified" ].map((id) => {
      return (
          <li key={id}>
            {id} : {JSON.stringify(fileProperties[id])}
          </li>
      );
    });

    let buttonList = ["ACL", "Work Flow", "Tasks", "Audit","Blob"].map((button) => {
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
    let containers = ["Root", "Workspace", "Domain", "WorkspaceRoot", "SectionRoot", "TemplateRoot", "Folder"];
    let fileOrFolderView;
    if (containers.includes(node.item.type)){
      fileOrFolderView = <FolderView workingNode={this.props.workingNode}/>;
    } else {
      fileOrFolderView = <FileView workingNode={this.props.workingNode} />;
    }

    return (
      <div className="file-view-wrapper">
        <h2>Title: {title}</h2>
        <div className="right-main-view-button-wrapper">
          <button onClick={this._setWorkingButton.bind(this,"Create Document")} className="submit-button">Create Document</button>
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
