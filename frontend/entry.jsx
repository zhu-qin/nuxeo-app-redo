import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Link, Router, Route, IndexRoute, hashHistory} from 'react-router';

// components
import LogIn from './views/log_in';
import MainView from './views/main_view';

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
