const Nuxeo = require('nuxeo');
import {merge} from 'lodash';

import DocumentStore from '../data/document_store';

let _nuxeo;

const NuxeoUtils = {
  signIn(logIn, directToDashboard){
    let nuxeo = new Nuxeo({
      baseURL: logIn.url,
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


  batchUpload(params){
      var blob = new Nuxeo.Blob({
          content: params.data.file,
          name: params.data.file.name,
          mimeType: params.data.file.type,
          size: params.data.file.size
      });

      _nuxeo.batchUpload()
          .upload(blob)
          .then((res) => {
              let data = {
                  "upload-batch": res.blob["upload-batch"],
                  "upload-fileId": res.blob["upload-fileId"]
              };

              let finalDoc = {
                  "entity-type": "document",
                  "name":`${params.data.title}`,
                  "type": "File",
                  "properties": {
                      "file:content": data,
                  }
              };
              NuxeoUtils.crudUtil({
                  method: "create",
                  path: params.path,
                  data: finalDoc,
                  success: params.success
              })


          });

  },


  attachFile(docToAttachTo, upload) {

    // var blob = new Nuxeo.Blob({
    //     content: upload.file,
    //     name: upload.title,
    //     mimeType: upload.file.type,
    //     size: upload.file.size
    // });

    let blob = new Nuxeo.Blob({content: upload.file});
      _nuxeo.batchUpload()
          .upload(blob)
          .then(function(res) {
              return _nuxeo.operation('Blob.AttachOnDocument')
                  .param('document', `${docToAttachTo.item.uid}`)
                  .input(res.blob)
                  .execute({ schemas: ['dublincore', 'file']});
          })
          .then(function(res) {
              return _nuxeo.repository().fetch(`${docToAttachTo.item.uid}`)
          })
          .then((doc) => {
             debugger
          })
          .catch(function(error) {
              throw error;
          });
      // let blob = new Blob(["Hello World"], {
      //     type: 'text/plain',
      // });
      //
      // let finalBlob = new Nuxeo.Blob({
      //     name: "test",
      //     content: blob,
      //     mimeType: 'text/plain',
      //     size: blob.length,
      // });
      // const batch = _nuxeo.batchUpload();
      // return _nuxeo.Promise.all([batch.upload(finalBlob), _nuxeo.repository().fetch(docToAttachTo.item.uid)])
      //     .then((values) => {
      //         const batchBlob = values[0].blob;
      //         const doc = values[1];
      //         doc.set({ 'file:content': batchBlob });
      //         return doc.save({ schemas: ['dublincore', 'file'] });
      //     })
      //     .then((doc) => {
      //
      //         let fileReader = new FileReader();
      //         fileReader.onloadend = () => {
      //             let results = fileReader.result;
      //             let text = fileReader.readAsText(results);
      //             debugger
      //         };
      //     });
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
          case "update":
              _nuxeo.repository()
                  .schemas(finalParams.schemas)
                  .update(path, finalParams.data)
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
  },
};

module.exports = NuxeoUtils;
