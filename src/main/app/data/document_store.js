import TreeNode from './tree_node.js';

let _listeners = [];
let _root;
let _user;
let _workingNode;


const DocumentStore = {
  getRoot(){
    return _root;
  },

  setRoot(mainRepo) {
    _root = new TreeNode(mainRepo);
    DocumentStore.invokeListeners();
    return _root;
  },

  addChild(parentNode, childEl){
    parentNode.addChild(new TreeNode(childEl));
    DocumentStore.invokeListeners();
  },

  deleteChild(parentNode, childNode) {
    parentNode.removeChild(childNode);
    DocumentStore.invokeListeners();
  },
  
  setUser(user) {
    _user = user;
  },

  getUser() {
    return _user;
  },

  addListener(listener) {
    _listeners.push(listener);
    let idx = _listeners.indexOf(listener);
    return {
      remove: () => {
        _listeners.splice(idx, 1)
      }
    }
  },

  invokeListeners() {
    _listeners.forEach((listener) => {
      listener();
    });
  },

  setWorkingNode(node) {
    _workingNode = node;
    DocumentStore.invokeListeners();
  },

  getWorkingNode() {
    return _workingNode;
  },

  setProperty(node, res, adapter){
    node[adapter] = res;
    DocumentStore.invokeListeners();
  }

};


export default DocumentStore;
