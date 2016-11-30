import React from 'react';
import TreeActions from '../../actions/tree_actions.js';
import DocumentTypeConstants from '../../constants/document_type_constants';
import DocumentStore from '../../data/document_store.js';

const containers = DocumentTypeConstants.containers;
const documents = DocumentTypeConstants.documents;

class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type: "Workspace",
            activeType: "Workspace"
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
        let parentNode = this.props.workingNode;
        e.preventDefault();
        let success = (res) => {
            DocumentStore.addChild(parentNode, res);
            this.setState({title:"", description: ""});
        };
        TreeActions.createDocument(parentNode, this.state, success);
    }

    render() {
        let createCollaborativeWorkspaces = containers.map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        let createDocuments = documents.map((type) => {
            return (
                <button className="create-document-button" key={type} onClick={this._changeDocumentType.bind(this, type)}>{type}</button>
            );
        });

        return (
            <div className="right-main-view-show-working-button">
                <div className="create-document-button-wrapper">
                    <div className="create-document-button-divider">
                        <h4>Collaborative Spaces</h4>
                        {createCollaborativeWorkspaces}
                    </div>
                    <div className="create-document-button-divider">
                        <h4>Documents</h4>
                        {createDocuments}
                    </div>
                </div>

                <h4>Create {this.state.type}</h4>
                <form onSubmit={this._handleSubmit.bind(this)} className="create-document-form">
                    Title:
                    <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
                    Description:
                    <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
                    <input className="create-document-button" type="submit" value="Create Document" />
                </form>
            </div>
        );
    }

}

module.exports = CreateDocument;