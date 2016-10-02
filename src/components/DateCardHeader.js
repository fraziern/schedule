import React, { Component, PropTypes } from "react";
import padlock from "../img/lock.svg";

class DateCardHeader extends Component {

  constructor(props) {
    super(props);
  }

  getDateName(JSONDateIn) {
    const dateIn = new Date(JSONDateIn);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return MONTHS[dateIn.getUTCMonth()] + " " + dateIn.getUTCDate() + ", " + dateIn.getUTCFullYear();
  }

  render() {
    const disabled = this.props.isDisabled;
    const headerClass = "panel-heading " + ((disabled === "true") ? "panel-heading--disabled" : "");
    const lockClass = (disabled === "true") ? "padlock" : "padlock padlock--hidden";

    return (
      <div className={headerClass}>
        <h3>{this.getDateName(this.props.dateScheduled)}</h3>
        <img src={padlock} alt="locked" className={lockClass} />
      </div>
    );
  }
}

DateCardHeader.PropTypes = {
  dateScheduled: PropTypes.string.isRequired,
  isDisabled: PropTypes.string
};

export default DateCardHeader;
