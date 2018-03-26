import PropTypes from 'prop-types';
import React, { Component } from "react";

class CSVDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.convertArraysToCSV = this.convertArraysToCSV.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  convertArraysToCSV(rows, columns) {
    // CSV uses double quotes
    const header = '"' + columns.join('","').concat('"\n');
    const allRowString = rows.map((row) => {
      let rowString = '"';
      columns.forEach((col) => {
        rowString += row[col] + '","';
      });
      rowString = rowString.slice(0, -3); // chop off that extra comma
      rowString += '"\n';
      return rowString;
    }).reduce((prev, curr) => prev + curr );

    return header + allRowString;
  }

  handleClick(e) {
    const csv = (this.props.rows.length > 0) ? this.convertArraysToCSV(this.props.rows, this.props.columns) : null;
    if (csv) {
      const URI = "data:text/csv;charset=utf-8," + encodeURI(csv);

      // this trick will generate a temp <a /> tag
      // taken from http://jsfiddle.net/hybrid13i/JXrwM/
      var link = document.createElement("a");
      link.href = URI;

      //set the visibility hidden so it will not effect on your web-layout
      link.style = "visibility:hidden";
      link.download = this.props.filename + ".csv";

      //this part will append the anchor tag and remove it after automatic click
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    e.preventDefault();
  }

  render() {
    return (
      <div onClick={this.handleClick} className="csv-button btn btn-default btn-sm">
        <span className="glyphicon glyphicon-download-alt"></span>
      </div>
    );
  }
}

CSVDownloadButton.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  filename: PropTypes.string.isRequired
};

export default CSVDownloadButton;
