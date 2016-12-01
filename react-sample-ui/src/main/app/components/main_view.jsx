import React from 'react';
// store
import DocumentStore from '../data/document_store.js';
// actions
import TreeActions from '../actions/tree_actions.js';

// components
import ErrorsComponent from './errors/errors_component.jsx';
import RightMainView from './right_main_view.jsx';
import FileTree from './file_tree.jsx';

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: DocumentStore.getUser(),
      root: undefined,
      workingNode: undefined,
    };
  }

  componentDidMount() {
    this.rootListener = DocumentStore.addListener(this._rootListener.bind(this));
    this.nodeListener = DocumentStore.addListener(this._setWorkingNode.bind(this));
    TreeActions.fetchRoot();
  }

  componentWillUnmount(){
    this.rootListener.remove();
    this.nodeListener.remove();
  }

  _setWorkingNode() {
    this.setState({ workingNode: DocumentStore.getWorkingNode() });
  }

  _rootListener() {
    this.setState({root: DocumentStore.getRoot()});
  }

  render() {
    let tree;
    let workingNode;
    if (this.state.root) {
      tree = (<FileTree node={this.state.root}/>);
    }

    if (this.state.workingNode) {
      workingNode = <RightMainView workingNode={this.state.workingNode}/>;
    }

    return (
      <div className="main-wrapper">
        <div className="side-panel-wrapper">
          <div className="side-panel-profile">
            {this.state.user.id}
          </div>
          {tree}
        </div>
        <div className="right-main-view-wrapper">
          {workingNode}
        </div>
      </div>
    );
  }
}

module.exports = MainView;
