import React from 'react';
import TreeActions from '../actions/tree_actions.js';

class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            description: "",
            type: "File"
        };
    }

    _handleChange(field) {
        return (e) => {
            this.setState({[field]: e.target.value});
        };
    }

    _handleSubmit(e) {
        e.preventDefault();
        TreeActions.createDocument(this.props.workingNode, this.state);
        this.setState({title:"", description: "", type: "File"});
    }

    render() {
        return (
            <div>
                <h3>Create Document</h3>
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