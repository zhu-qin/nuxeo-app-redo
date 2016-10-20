import React from 'react';
import ReactDOM from 'react-dom';


class FileView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let file = this.props.workingFile;
    let entry;
    if (file) {
      entry = file.item.title;
    }

    return (
      <div className="file-view-wrapper">
        {entry}
      </div>
    );
  }

}

module.exports = FileView;
