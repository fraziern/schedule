import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import spinner from "../img/loading.gif";

class VisibleReports extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div>
        Reports
      </div>
    );
  }
}

VisibleReports.propTypes = {};

function mapStateToProps(state) {
  return {};
}

export default connect(
  mapStateToProps
)(VisibleReports);
