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

    toggleShowChildren(node, callback) {
        if (node.showSubFiles && this.state.currentFile === this.props.mainView.state.workingFile) {
            this.setState({showSubFiles: false});
        } else {
            this.setState({showSubFiles: true});
            if (Object.keys(this.state.currentFile.children).length === 0){
                this._getChildren();
            }
            this.props.mainView._setWorkingFile(this.state.currentFile);
        }
    }





};


export default TreeActions;