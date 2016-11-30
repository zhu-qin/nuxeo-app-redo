const Nuxeo = require('nuxeo/dist/nuxeo');
import {merge} from 'lodash';
import DocumentStore from '../data/document_store';
import { receiveErrors, clearErrors } from '../actions/error_actions'

let _nuxeo;
let _store;

const DEFAULTS = {
    method: "get",
    adapter: undefined,
    path: "/",
    schemas: ["*"],
    data: undefined,
    operation: undefined,
    success: (res) => {
        console.log(res)
    },
    fail: (res,xhr) => {
        _store.dispatch(receiveErrors(res,xhr));
        setTimeout(function() {
            _store.dispatch(clearErrors())
        }, 1500);
    }
};

const NuxeoUtils = {
  signIn(logIn, directToDashboard){
    let nuxeo = new Nuxeo({
      baseURL: logIn.url,
      // auth: {
      //   method: 'basic',
      //   username: logIn.username,
      //   password: logIn.password
      // },
    });
    _nuxeo = nuxeo;
    let success = (res) => {
        DocumentStore.setUser(res);
        directToDashboard();
    };
    NuxeoUtils.crudUtil({
        success: success
    });



   _nuxeo.enrichers({document: ['subtypes']});
    // _nuxeo.login()
    //   .then(function(res) {
    //     DocumentStore.setUser(res);
    //     directToDashboard();
    //   })
    //   .catch(function(error) {
    //     throw error;
    //   });
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


  attachFile(docToAttachTo, upload, success) {
    let blob = new Nuxeo.Blob({content: upload.file});
      const batch = _nuxeo.batchUpload();
      _nuxeo.Promise.all([batch.upload(blob)])
          .then((values) => {
              let batchBlob = values[0].blob;
              docToAttachTo.item.set({ 'file:content': batchBlob });
              return docToAttachTo.item.save({ schemas: ['dublincore', 'file'] });
          })
          .then(success);
  },


  getUser(username) {
      _nuxeo.users()
          .fetch(username)
          .then((res) => {
             console.log(res);
          });
  },

  crudUtil(params) {
      let finalParams = merge({}, DEFAULTS, params);
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
              .update(finalParams.data)
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

  getConfiguration() {
      _nuxeo.request('api/v1/config/types')
          .get()
          .then((res) => {
              debugger;
          })
  },

  addStore(store){
      _store = store;
  }
};

export default NuxeoUtils;

Object.keys(NuxeoUtils).forEach((key) => {
   window[key] = NuxeoUtils[key];
    
});

