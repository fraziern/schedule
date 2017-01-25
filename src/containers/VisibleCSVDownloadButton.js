import React, { Component, PropTypes } from "react";
import moment from "moment";
import CSVDownloadButton from "../components/CSVDownloadButton";

class VisibleCSVDownloadButton extends Component {
  constructor(props) {
    super(props);
    this.massageData = this.massageData.bind(this);
  }

  massageData(data) {
    // input is dateCards in the format used by React render
    // output is an object {columns, rows} where each value is an array
    let returnValue = {};
    if (!data) return returnValue;

    // pass 1/2: pull out dates
    // and build slot map
    let columns = [ "Slot Name" ];
    let slotMap = {};
    data.forEach((el) => {
      const thisDate = moment(el.dateScheduled).format("MM/DD/YYYY");
      columns.push(thisDate);

      el.slots.forEach((slot) => {
        const slotName = slot.assignment.name;
        if (!slotMap.hasOwnProperty(slotName)) slotMap[slotName] = {};
        slotMap[slotName][thisDate] = slot.assignee.name;
      });
    });

    // pass 3: build rows array
    const rows = Object.keys(slotMap).map((name) => {
      let row = { "Slot Name": name };
      columns.forEach((date) => {
        if (!slotMap[name].hasOwnProperty(date)) row[date] = "N/A";
        else row[date] = slotMap[name][date];
      });
      return row;
    });

    return {
      columns,
      rows
    };
  }

  render () {
    const spreadsheet = this.massageData(this.props.dateCards);

    // return (
    // <CSVDownloadButton columns={spreadsheet.columns} rows={spreadsheet.rows} />
    // );
    return (
      <div>
        {JSON.stringify(spreadsheet)}
      </div>
    );
  }
}

VisibleCSVDownloadButton.propTypes = {
  dateCards: PropTypes.array
};

export default VisibleCSVDownloadButton;
