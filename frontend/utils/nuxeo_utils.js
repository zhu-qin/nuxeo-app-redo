const Nuxeo = require('nuxeo');
import DocumentStore from '../data/document_store';

let _nuxeo;

const NuxeoUtils = {

  signIn(logIn, directToDashboard){
    let nuxeo = new Nuxeo({
      // baseURL:  `http://demo.nuxeo.com/nuxeo`,
      // auth: {
      //   method: 'basic',
      //   username: `Administrator`,
      //   password: `Administrator`
      // },
      baseURL: "http://ec2-54-84-245-21.compute-1.amazonaws.com:8080/nuxeo",
      auth: {
        method: 'basic',
        username: `${logIn.username}`,
        password: `${logIn.password}`
      },
    });
    _nuxeo = nuxeo;
    _nuxeo.login()
      .then(function(res) {
        DocumentStore.setUser(res);
        directToDashboard();
      })
      .catch(function(error) {
        throw error;
      });
  },

  fetchRepo() {
    _nuxeo.repository('default').fetch(`/default-domain`)
     .then(function(doc) {
       console.log(doc);
     })
     .catch(function(error) {
       throw error;
     });
  },

  fetchChild(){
    _nuxeo.operation('Document.GetChild')
    .input('/default-domain')
    .params({
      name: 'workspaces',
    })
    .execute()
    .then(function(res) {
      console.log(res);
    })
    .catch(function(error) {
      throw new Error(error);
    });
  },

  getFiles(){
    _nuxeo.directory('workspaces')
   .fetchAll()
   .then(function(entries) {
     console.log(entries);
   });
 },

  createDocument(){
    _nuxeo.operation('Document.Create')
    .params({
      type: 'Folder',
      name: 'My Folder',
      properties: 'dc:title=My Folder \ndc:description=A Simple Folder'
    })
    .input('/default-domain')
    .execute()
    .then(function(doc) {
        console.log(doc);
    })
    .catch(function(error) {
      throw error;
    });
  },

  getDocuments() {
    _nuxeo.operation('Document.GetChildren')
      .params({
        name: 'default-domain'
      })
      // .input('/default-domain')
      .execute()
      .then(function(res) {
        console.log(res);
        DocumentStore.populateFolders(res);
      })
      .catch(function(error) {
        throw new Error(error);
      });
  },

  getNuxeo() {
    return _nuxeo;
  }

};

Object.keys(NuxeoUtils).forEach((fn) => {
  window[fn] = NuxeoUtils[fn];
});

module.exports = NuxeoUtils;
