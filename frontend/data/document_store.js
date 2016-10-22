import TreeNode from './tree_node.js';

let _listeners = [];
let _root;
let _user;


const DocumentStore = {

  setRoot(mainRepo) {
    _root = new TreeNode(mainRepo);
    console.log(_root);
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

  populateFolders(folders) {
    _folders = folders;
    DocumentStore.invokeListeners();
  },

  all() {
    return Object.assign({}, _folders);
  }


};


module.exports = DocumentStore;
