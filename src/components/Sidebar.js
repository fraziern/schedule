import React, { Component, PropTypes } from "react";
// import moment from "moment";
import DayPicker, { DateUtils } from "react-day-picker";
import Menubar from "./Menubar";

import "react-day-picker/lib/style.css";

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.handleDayClick = this.handleDayClick.bind(this);
  }

  handleDayClick(day, { valid, disabled }) {
    if (!valid || disabled) {
      return;
    }
    const targetCard = this.props.dateCards.find((card) => {
      const newDate = new Date(card.dateScheduled);
      return DateUtils.isSameDay(newDate, day);
    });
    if (targetCard) this.props.handleDayClick(targetCard.id);
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
            onDayClick={ this.handleDayClick }
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
  handleDayClick: PropTypes.func.isRequired,
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
