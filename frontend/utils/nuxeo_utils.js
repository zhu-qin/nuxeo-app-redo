const Nuxeo = require('nuxeo');
const merge = require('merge');


import DocumentStore from '../data/document_store';

let _nuxeo;
let _user;

const NuxeoUtils = {
  signIn(logIn, directToDashboard){
    let nuxeo = new Nuxeo({
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
       let root = DocumentStore.setRoot(doc);
       NuxeoUtils.fetchChildren(root);
     })
     .catch(function(error) {
       throw error;
     });
  },

  fetchChildren(parentNode){
      let path = parentNode.item.path.split(".")[0];
      _nuxeo.repository().schemas(['*'])
      .fetch(`/${path}/@children`)
      .then((docs) => {
        docs.entries.forEach((entry) => {
          DocumentStore.addChild(parentNode, entry);
        });
       })
     .catch(function(error) {
      throw error;
    });
  },

  createDocument(parentNode, doc) {
    let content;
    if (doc.type != 'Workspace') {
      doc.type = 'Picture';
      content = {
        "name": `${doc.title}`,
        "mime-type": `${doc.file["type"]}`,
        "encoding": null,
        "length": `${doc.file["size"]}`,
        "digestAlgorithm": "MD5",
        "data": `${doc.fileUrl.split(',')[1]}`
      };
    }

    let finalDoc = {
      "entity-type": "document",
      "name":`${doc.title}`,
      "type": `${doc.type}`,
      "properties": {
          "dc:title": `${doc.title}`,
          "dc:description": `${doc.description}`,
          "file:content": content
      }
    };
    let path = parentNode.item.uid;
    _nuxeo.repository()
     .create(`${path}`, finalDoc)
     .then(function(doc) {
       DocumentStore.addChild(parentNode, doc);
     })
     .catch(function(error) {
       throw error;
     });
  },

  deleteDocument(node) {
    let uid = node.item.uid;
    _nuxeo.repository()
     .delete(`${uid}`)
     .then(function(doc) {
       DocumentStore.deleteChild(node.parent, node);
     })
     .catch(function(error) {
       throw error;
     });
  }

};


module.exports = NuxeoUtils;
