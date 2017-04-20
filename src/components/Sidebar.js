import React, { Component, PropTypes } from "react";
// import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import Menubar from "./Menubar";

import "react-day-picker/lib/style.css";

class Sidebar extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const validDates = (this.props.isLoaded) ? this.props.dateCards.map((card) =>
      new Date(card.dateScheduled)
    ) : null;

    return (
        <div className="sidebar panel panel-default">
          <Menubar admin={this.props.admin} dateCards={this.props.dateCards}/>
          <div className="sidebar-header">Jump To Date</div>
          <DayPicker
            numberOfMonths={2}
            modifiers={{
              valid: validDates,
              disabled: { before: new Date() }
            }}
            />
        </div>
    );
  }
}

Sidebar.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  admin: PropTypes.bool,
  cutoffDate: PropTypes.string,
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.array.isRequired
  }))
};

export default Sidebar;
