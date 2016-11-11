import NuxeoUtils from '../utils/nuxeo_utils';
import DocumentStore from '../data/document_store';

const TreeActions = {
    fetchRoot(){
        NuxeoUtils.crudUtil({
            success: (doc) => {
                let root = DocumentStore.setRoot(doc);

                TreeActions.fetchChildren(root);
            }
        })
    },

    fetchChildren(node) {
        let success = (docs) => {
            docs.entries.forEach((entry) => {
                DocumentStore.addChild(node, entry);
            });
        };
        let path = node.item.path.split(".")[0];
        NuxeoUtils.crudUtil({
            path: path,
            adapter: 'children',
            success: success
        });
    },

    deleteDocument(node){
        let path = node.item.uid;
        let success = (doc) => {
            DocumentStore.deleteChild(node.parent, node);
        };
       NuxeoUtils.crudUtil({
           method: "delete",
           path: path,
           success: success
       });
    },

    createDocument(node, doc){
        if (doc.type != 'Workspace') {
            doc.type = 'File';
        }
        let finalDoc = {
            "entity-type": "document",
            "name":`${doc.title}`,
            "type": `${doc.type}`,
        };
        let success = (doc) => {
            DocumentStore.addChild(node, doc);
        };

        let path = node.item.uid;
        NuxeoUtils.crudUtil({
            method: "create",
            path: path,
            data: finalDoc,
            success: success
        })
    },

    setWorkingNode(node) {
        DocumentStore.setWorkingNode(node);
    },

    getWorkingNode(){
        return DocumentStore.getWorkingNode();
    },

    toggleShowChildren(node, callback) {
        if (node.showChildren && node === TreeActions.getWorkingNode()) {
            node.showChildren = false;
        } else {
            node.showChildren = true;
            if (Object.keys(node.children).length === 0){
                TreeActions.fetchChildren(node);
            }
            TreeActions.setWorkingNode(node);
        }
        callback();
    }

};


export default TreeActions;