import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';


import NuxeoUtils from '../utils/nuxeo_utils.js';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "qzhu",
      password: "appbuilder"
    };
  }

  _handleChange(field) {
    return (e) => {
      this.setState({[field]: e.target.value});
    };
  }

  _directToDashboard() {
    hashHistory.push('/documents');
  }

  _submitForm(e){
    e.preventDefault();
    NuxeoUtils.signIn(this.state, this._directToDashboard);
  }

  render() {
    return (
      <div className="login-wrapper">
        <form className="login-form" onSubmit={this._submitForm.bind(this)}>
          <div className="login-input">
            Username:
            <input type="text" value={this.state.username} onChange={this._handleChange("username")}/>
          </div>
          <div>
            Password:
            <input type="password" value={this.state.password} onChange={this._handleChange("password")}/>
          </div>
          <input type="submit" value="Sign In" />
        </form>
      </div>
    );
  }

}

module.exports = LogIn;
