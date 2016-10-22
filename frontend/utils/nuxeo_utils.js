const Nuxeo = require('nuxeo');
const merge = require('merge');


import DocumentStore from '../data/document_store';

let _nuxeo;
let _user;

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
        _user = res;
        directToDashboard();
      })
      .catch(function(error) {
        throw error;
      });
  },

  fetchRepo() {
    _nuxeo.repository()

     .fetch(`/default-domain/UserWorkspaces/${_user.id}`)
     .then(function(doc) {
       DocumentStore.setRoot(doc);
     })
     .catch(function(error) {
       throw error;
     });
  },

  fetchChildren(){
    _nuxeo.repository().schemas(['*'])    // specify the schemas you want to retrieve (could be ['*'])
    .fetch('/default-domain/UserWorkspaces/qzhu/@children') // use the adapter to get the children
    .then((docs) => {
       docs.entries.forEach((doc) => {
          console.log( doc.uid + ':' + doc.path + ' - ' + doc.title + ' (' + doc.type + ')');
          console.log(doc.get('dc:created'));
          console.log(doc.get('dc:contributors'));
          //console.log(doc.properties);
       });
     })
   .catch(function(error) {
    console.log(error);
    throw error;
  });
  },

  createDocument(doc) {
    if (!doc) {
      doc = {};
    }
    doc.name = "hello";

    let defaultDoc = {
      "entity-type": "directory",
      "name":"Hello",
      "type": "Collection",
      "properties": {
          "dc:title": "Hello",
          "dc:description": "Created via the REST API"
      }
    };

    _nuxeo.repository()
     .create("/default-domain/UserWorkspaces/qzhu", defaultDoc)
     .then(function(doc) {
       console.log(doc);
     })
     .catch(function(error) {
       throw error;
     });
  },


};

Object.keys(NuxeoUtils).forEach((fn) => {
  window[fn] = NuxeoUtils[fn];
});

module.exports = NuxeoUtils;
