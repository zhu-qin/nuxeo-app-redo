import React from 'react';

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
                    <a href={content["data"]} download>Download Link</a>
                </div>
            );
        }

        return (
            <div className="file-view-wrapper">
                <h3>Attachments</h3>
                <ul>
                    {embedded}
                </ul>
            </div>
        );
    }

}

module.exports = FileView;