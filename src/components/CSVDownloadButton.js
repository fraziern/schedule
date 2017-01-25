import React, { Component, PropTypes } from "react";

class CSVDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.convertArrayToCSV = this.convertArrayToCSV.bind(this);
  }

  convertArrayToCSV(data) {
    // data is ...
  }

  render() {
    <div>
      Button
    </div>
  }
}

CSVDownloadButton.propTypes = {
  data: PropTypes.object.isRequired,
  filename: PropTypes.string.isRequired
};

export default CSVDownloadButton;
