import React from 'react';
import Filler from './Filler';
import "./FileTransferStyles.css";

class FileTransferPopup extends React.Component {

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="popup-backdrop">
        <div className="popup">
          <div className="progress-bar">
            Siunčiama
            <Filler percentage={this.props.percentage} />
            {/* {this.props.children} */}
          </div>
        </div>
      </div>
    );
  }
}

export default FileTransferPopup;