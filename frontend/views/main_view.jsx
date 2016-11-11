import React from 'react';
// store
import DocumentStore from '../data/document_store.js';
// actions
import TreeActions from '../actions/tree_actions.js';

// components
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
    DocumentStore.addListener(this._rootListener.bind(this));
    DocumentStore.addListener(this._setWorkingNode.bind(this));
    TreeActions.fetchRoot();
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
      tree = (
        <FileTree
        node={this.state.root}
        />
      );
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
        {workingNode}
      </div>
    );
  }

}

module.exports = MainView;
