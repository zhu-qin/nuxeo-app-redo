import React from 'react';
import TreeActions from '../actions/tree_actions.js';
import NuxeoUtils from '../utils/nuxeo_utils.js';

class AttachFile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      type: "File",
      fileUrl: "",
      file: undefined
    };
  }

  _handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  _previewFile(e) {
  let file = e.currentTarget.files[0];
  let fileReader = new FileReader();

  fileReader.onloadend = () => {
    this.setState({ file: file, fileUrl: fileReader.result });
  };

  if (file) {
      fileReader.readAsDataURL(file);
    } else {
      this.setState({ fileUrl: "", file: undefined });
    }
  }

  _handleSubmit(e) {
    e.preventDefault();
    // let formData = new FormData();
    // formData.append("doc[title]", this.state.title);
    // formData.append("doc[nuxeo-entity]", this.state.file);
    // formData.append("doc[description]", this.state.description);
    // TreeActions.attachFile(this.props.workingNode, this.state);
    NuxeoUtils.attachFile(this.props.workingNode, this.state);
    this.setState({title:"", description: "", file: ""});
  }

  render() {
    let button = <input className="button-form" type="submit" value="Upload"/>;
    let submit = this._handleSubmit.bind(this);

    let embedded;
    if(this.state.file) {
      embedded = <embed src={this.state.fileUrl} type={this.state.file.type} className="upload-preview-embed"/>;
    }

    return (
      <div>
        <h3>Attach File</h3>
        <form onSubmit={submit} className="create-form">
          Title:
          <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
          Description:
          <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
          <br></br>
          File:
          <input className="submit-button submit-button-upload" type="file" onChange={this._previewFile.bind(this)}/>
          <br></br>
          <input className="submit-button" type="submit" value="Attach File" />
          <div className="upload-preview">{embedded}</div>
        </form>
      </div>
    );
  }

}

module.exports = AttachFile;
