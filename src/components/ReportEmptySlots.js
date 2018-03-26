import PropTypes from 'prop-types';
import React from "react";
import { connect } from "react-redux";
import { getEmptySlotReportByFilter } from "../selectors";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const CustomizedAxisTick = function(props) {
  const {x, y, payload} = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">{payload.value}</text>
    </g>
  );
};

CustomizedAxisTick.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  payload: PropTypes.object
};

function ReportEmptySlots(props) {
  // import and sort data
  let emptySlotTable = null;
  if (props.emptySlots) {
    let dateList = [];

    for (let el in props.emptySlots) {
      const { dateScheduled, frequency } = props.emptySlots[el];
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
      <h2>Empty Slots in Last {props.reportFilter}</h2>
      {emptySlotTable}
    </div>
  );
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
