const Nuxeo = require('nuxeo');
import {merge} from 'lodash';

import DocumentStore from '../data/document_store';

let _nuxeo;

const NuxeoUtils = {
  signIn(logIn, directToDashboard){
    let nuxeo = new Nuxeo({
      baseURL: "http://localhost:8080/nuxeo",
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

  attachFile(docToAttachTo, upload) {
    var blob = new Nuxeo.Blob({ content: upload.file, name: upload.title, mimeType: upload.file.type, size: upload.file.size });

    // let blob = new Nuxeo.Blob({content: upload.file});
    //   _nuxeo.batchUpload()
    //       .upload(blob)
    //       .then(function(res) {
    //           debugger
    //           return _nuxeo.operation('Blob.AttachOnDocument')
    //               .param('document', `${docToAttachTo.item.path}`)
    //               .input(res.blob)
    //               .execute({ schemas: ['dublincore', 'file']});
    //       })
    //       .then(function(doc) {
    //           debugger;
    //           console.log(doc.properties["file:content"]);
    //       })
    //       .catch(function(error) {
    //           throw error;
    //       });

    _nuxeo.batchUpload()
      .upload(blob)
      .then(function(res) {

          let data = {
              "upload-batch": res.blob["upload-batch"],
              "upload-fileId": res.blob["upload-fileId"]
          };
        debugger

          docToAttachTo.item.set({ 'file:content': data });

        return docToAttachTo.item.save();
      })
      .then(function(doc) {
          debugger
        docToAttachTo.item = doc;
        DocumentStore.invokeListeners();
      })
      .catch(function(error) {
        throw error;
      });
  },


  getUser(username) {
      _nuxeo.users()
          .fetch(username)
          .then((res) => {
             console.log(res);
          });
  },

  crudUtil(params) {
      let defaults = {
          method: "get",
          adapter: undefined,
          path: "/",
          schemas: ["*"],
          data: undefined,
          operation: undefined,
          success: (res) => {
              console.log(res)
          },
          fail: (res) => {
              console.log(res)
          }
      };
      let finalParams = merge({}, defaults, params);

      let path = finalParams.path;

      if (finalParams.adapter) {
          path += `/@${finalParams.adapter}`;
      }
      if (finalParams.operation) {
          path += `/${finalParams.operation}`;
      }

      switch (finalParams.method.toLowerCase()) {
          case "get":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .fetch(path)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          case "delete":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .delete(path)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          case "create":
          _nuxeo.repository()
              .schemas(finalParams.schemas)
              .create(path, finalParams.data)
              .then(finalParams.success)
              .catch(finalParams.fail);
              break;
          default:
              throw "Method does not exist";
      }
  }
};

module.exports = NuxeoUtils;
