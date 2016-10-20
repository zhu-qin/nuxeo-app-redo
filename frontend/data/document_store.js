let _listeners = [];
let _root = {};
let _folders = {};
let _user;


const DocumentStore = {
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
