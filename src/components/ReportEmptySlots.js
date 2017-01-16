import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { getEmptySlotReport } from "../selectors";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedAxisTick = React.createClass({
  propTypes: {
    x: PropTypes.int,
    y: PropTypes.int,
    payload: PropTypes.obj
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
        const date = dateScheduled.slice(0,10);
        dateList.push({ date, frequency });
      }

      emptySlotTable = (
        <LineChart
          width={500}
          height={300}
          data={dateList}
          margin={{top: 5, right: 5, left: 5, bottom: 40}}>

          <XAxis dataKey="date" name="Date" tick={<CustomizedAxisTick/>}/>
          <YAxis />
          <Line dataKey="frequency" name="Empty Slots" fill="#ddd" />
          <Tooltip />
        </LineChart>
      );
    }

    return (
      <div className="report-emptyslots">
        <h2>Empty Slots in Last Year</h2>
        {emptySlotTable}
      </div>
    );
  }
}

ReportEmptySlots.propTypes = {
  emptySlots: PropTypes.string
};

function mapStateToProps(state) {
  return {
    emptySlots: getEmptySlotReport(state.assignments)
  };
}

export default connect(
  mapStateToProps,
  null
)(ReportEmptySlots);
