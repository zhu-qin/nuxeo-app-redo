import React from 'react';
import TreeActions from '../../../actions/tree_actions.js';

class EditDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: `${this.props.workingNode.item.title}`,
            description: `${this.props.workingNode.item.description}`
        };
    }

    _handleChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        let doc = this.props.workingNode.item;

        // doc.set({ 'dc:title' : this.state.title});
        // doc.set({'dc:description': this.state.description});

        doc.properties['dc:title'] = this.state.title;
        doc.properties['dc:description'] = this.state.description;
        debugger
        TreeActions.editDocument(this.props.workingNode, doc);
        // this.setState({title:"", description: ""});
    }

    render() {

        return (
            <div className="right-main-view-show-working-button">
                <h4>Edit {this.state.type}</h4>
                <form onSubmit={this._handleSubmit.bind(this)} className="create-document-form">
                    Title:
                    <input type="text" onChange={this._handleChange("title")} value={this.state.title} />
                    Description:
                    <input type="text" onChange={this._handleChange("description")} value={this.state.description} />
                    <input className="create-document-button" type="submit" value="Update" />
                </form>
            </div>
        );
    }

}

module.exports = EditDocument;