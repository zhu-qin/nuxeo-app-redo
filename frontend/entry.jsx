import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Link, Router, Route, IndexRoute, hashHistory} from 'react-router';

// components
import LogIn from './views/log_in';
import MainView from './views/main_view';

// utils
import NuxeoUtils from './utils/nuxeo_utils.js';
// data
import DocumentStore from './data/document_store';

let redirectConditions = function (nextState, replace) {
  if (!DocumentStore.getUser()) {
    replace("/");
  }
};

const AppRouter = (
    <Router history={hashHistory}>
      <Route path="/" component={LogIn} />
      <Route path="/documents" component={MainView} onEnter={redirectConditions}/>
    </Router>
  );




document.addEventListener("DOMContentLoaded", () => {
  let root = document.getElementById('root');
  ReactDOM.render(AppRouter, root);
});


// testing

Object.keys(NuxeoUtils).forEach((key) => {
    window[key] = NuxeoUtils[key]
});

let success = (res) => {
    debugger;
    console.log(res);
};

window.success = success;
window.store = DocumentStore;