import React from 'react';
import TreeActions from '../../actions/tree_actions.js';

class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type: "File",
            activeType: "File"
        };
    }

    _handleChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    _changeDocumentType(type, e) {
        this.setState({type: type});
    }

    _handleSubmit(e) {
        e.preventDefault();
        TreeActions.createDocument(this.props.workingNode, this.state);
        this.setState({title:"", description: ""});
    }

    render() {
        let collaborativeWorkspaces = ["Ordered Folder", "Folder", "Forum", "Collection", "Workspace"].map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        let documents = ["Web Template", "Project", "Template", "Picture", "Video", "Portfolio", "Note", "Audio", "File"].map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        return (
            <div className="right-main-view-show-working-button">
                <div className="create-document-button-wrapper">
                    <div className="create-document-button-divider">
                        <h4>Collaborative Spaces</h4>
                        {collaborativeWorkspaces}
                    </div>
                    <div className="create-document-button-divider">
                        <h4>Documents</h4>
                        {documents}
                    </div>
                </div>

                <h3>Create {this.state.type}</h3>
                <form onSubmit={this._handleSubmit.bind(this)} className="create-form">
                    Title:
                    <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
                    Description:
                    <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
                    <br></br>
                    <input className="submit-button" type="submit" value="Create Document" />
                </form>
            </div>
        );
    }

}

module.exports = CreateDocument;