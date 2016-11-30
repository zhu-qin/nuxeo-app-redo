import React from 'react';
import ReactDOM from 'react-dom';
import ReactRouter, {Link, Router, Route, IndexRoute, hashHistory} from 'react-router';
import { Provider } from 'react-redux';

// components
import LogIn from './components/log_in';
import MainView from './components/main_view';
import ErrorsComponent from './components/errors/errors_component.jsx';

// data
import DocumentStore from './data/document_store';

// store
import configureStore from './store/store';

let redirectConditions = function (nextState, replace) {
  if (!DocumentStore.getUser()) {
    replace("/");
  }
};

const Root = ({ store }) => {
    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route path="/" component={LogIn}/>
                <Route path="/documents" component={MainView} onEnter={redirectConditions}/>
            </Router>
        </Provider>
    )
};

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();
  const root = document.getElementById('root');
  store.dispatch({
      type: 'RECEIVE_ERRORS',
      errors: ["error1"]
  });
  ReactDOM.render(<Root store={store} />, root);
});
