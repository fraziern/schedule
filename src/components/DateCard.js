import React, { Component } from "react";
import AssignmentRow from "./AssignmentRow";

class DateCard extends Component {

  getDateName(JSONDateIn) {
    const dateIn = new Date(JSONDateIn);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return MONTHS[dateIn.getUTCMonth()] + " " + dateIn.getUTCDate() + ", " + dateIn.getUTCFullYear();
  }

  render() {
    const disabled = this.props.cardDisabled || "";
    const headerClass = "card-date-container " + ((disabled === "true") ? "card-date-container-disabled" : "");

    let rows = this.props.slots.map((slot) =>
      (<AssignmentRow {...slot} key={slot.assignment} cardDisabled={disabled} />)
    );

    return (
      <div className="date-card">
        <div className={headerClass}>
        <h2 className="card-date">{this.getDateName(this.props.dateScheduled)}</h2>
        </div>
        <ul className="assignment-list">
          {rows}
        </ul>
      </div>
    );
  }
}

export default DateCard;
