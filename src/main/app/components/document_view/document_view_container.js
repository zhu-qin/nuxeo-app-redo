import { connect } from 'react-redux';

import { setCurrentNode } from '../../actions/tree_actions';

import FileTree from './file_tree.jsx';
import MainView from './main_view.jsx';
import RightMainView from './right_main_view';
import AttachFile from './right_main_view_components/attach_file';
import CreateDocumentForm from './right_main_view_components/create_document_form';
import EditDocument from './right_main_view_components/edit_document';
import FileView from './right_main_view_components/file_view';
import FolderView from './right_main_view_components/folder_view';
import ShowACL from './right_main_view_components/show_acl';
import ShowAudit from './right_main_view_components/show_audit';
import ShowTask from './right_main_view_components/show_task';
import ShowWorkFlow from './right_main_view_components/show_workflow';

const mapStateToProps = ({ fileTree }) => ({
    fileTree: fileTree
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentNode: (node) => dispatch(setCurrentNode(node))
});


// const DocumentViewContainer = [
//     FileTree,
//     MainView,
//     RightMainView,
//     AttachFile,
//     CreateDocumentForm,
//     EditDocument,
//     FileView,
//     FolderView,
//     ShowACL,
//     ShowAudit,
//     ShowTask,
//     ShowWorkFlow
// ].map((component) => {
//    return connect(mapStateToProps, mapDispatchToProps)(component);
// });
const DocumentViewContainer = connect(mapStateToProps, mapDispatchToProps)(MainView);

export default DocumentViewContainer;