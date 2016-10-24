import TreeNode from './tree_node.js';

let _listeners = [];
let _root;
let _user;


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
  },

  invokeListeners(){
    _listeners.forEach((listener) => {
      listener();
    });
  },

};


module.exports = DocumentStore;
