import React from 'react';

import AttachFile from './attach_file.jsx';

import NuxeoUtils from '../utils/nuxeo_utils';
import DocumentStore from '../data/document_store';

class FileView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let node = this.props.workingNode;
        let content = node.item.properties["file:content"];
        let embedded;
        if (content) {
            embedded = (
                <div><h3>{content["name"]}</h3>
                    <embed src={content["data"]} type={content["mime-type"]} className="upload-preview-embed" />
                </div>
            );
        }

        return (
            <div className="file-view-wrapper">
                <AttachFile workingNode={this.props.workingNode} />
                <h3>Attachments</h3>
                <ul>
                    {embedded}
                </ul>
            </div>
        );
    }

}

module.exports = FileView;