import React from 'react';
import ReactDOM from 'react-dom';
// store
import NuxeoUtils from '../utils/nuxeo_utils';

class CreateFolder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type: "Workspace"
    };
  }

  _handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  _handleSubmit(e) {
    e.preventDefault();
    NuxeoUtils.createDocument(this.props.mainView.state.workingFile, this.state);
    this.setState({title:"", description: "", type: "Workspace"});
  }

  render() {
    return (
      <div>
        <h3>Create Folder</h3>
        <form onSubmit={this._handleSubmit.bind(this)} className="create-form">
          Title:
          <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
          Description:
          <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
          <input type="submit" value="Create Folder" />
        </form>
      </div>
    );
  }

}

module.exports = CreateFolder;