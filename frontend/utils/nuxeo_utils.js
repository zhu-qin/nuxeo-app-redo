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
    //   let content = new Blob([upload.fileUrl], {
    //       type: upload.file.type
    //   });
    //
    let blob = new Nuxeo.Blob({content: upload.file});
    _nuxeo.batchUpload()
      .upload(blob)
      .then(function(res) {
        let batchId = res.blob["upload-batch"];
        let fileId = res.blob["upload-fileId"];
        docToAttachTo.item.set(
            { "file:content": {"upload-batch":`${batchId}`, "upload-fileId":`${fileId}` }}
        );

        return docToAttachTo.item.save();
      })

      .then(function(doc) {

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
