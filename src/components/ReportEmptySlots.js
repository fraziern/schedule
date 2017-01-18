import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getEmptySlotReportByFilter } from "../selectors";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedAxisTick = React.createClass({
  propTypes: {
    x: PropTypes.number,
    y: PropTypes.number,
    payload: PropTypes.object
  },

  render: function() {
    const {x, y, payload} = this.props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>
      </g>
    );
  }
});

class ReportEmptySlots extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    // import and sort data
    let emptySlotTable = null;
    if (this.props.emptySlots) {
      let dateList = [];

      for (let el in this.props.emptySlots) {
        const { dateScheduled, frequency } = this.props.emptySlots[el];
        const date = dateScheduled.slice(5,10);
        dateList.push({ date, frequency });
      }

      emptySlotTable = (
        <LineChart
          width={600}
          height={300}
          data={dateList}
          margin={{top: 5, right: 5, left: -25, bottom: 40}}>

          <XAxis dataKey="date" name="Date" tick={<CustomizedAxisTick/>}/>
          <YAxis />
          <Line dataKey="frequency" name="Empty Slots" fill="#ddd" />
          <Tooltip />
        </LineChart>
      );
    }

    return (
      <div className="report-emptyslots">
        <h2>Empty Slots in Last {this.props.reportFilter}</h2>
        {emptySlotTable}
      </div>
    );
  }
}

ReportEmptySlots.propTypes = {
  emptySlots: PropTypes.object,
  reportFilter: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    emptySlots: getEmptySlotReportByFilter(state.assignments, state.reports.reportFilter),
    reportFilter: state.reports.reportFilter
  };
}

export default connect(
  mapStateToProps,
  null
)(ReportEmptySlots);
