import React, { Component, PropTypes } from "react";
import padlock from "../img/lock.svg";
import moment from "moment";
import CardLabel from "./CardLabel";

class DateCardHeader extends Component {

  constructor(props) {
    super(props);
    this.handleEditButton = this.handleEditButton.bind(this);
  }

  getDateName(JSONDateIn) {
    return moment(JSONDateIn).format("MMMM Do, YYYY");
  }

  handleEditButton(e) {
    e.preventDefault();
    this.props.toggleEditing();
  }

  render() {
    const disabled = this.props.isDisabled;
    const headerClass = "panel-heading " + ((disabled === "true") ? "panel-heading--disabled" : "");
    const lockClass = (disabled === "true") ? "padlock" : "padlock padlock--hidden";
    const pencilClass = "glyphicon glyphicon-pencil pull-right" + ((this.props.editing) ? " pencil--red" : "");

    const pointer = (this.props.admin) ? (<span onClick={this.handleEditButton} className={pencilClass} aria-hidden="true"></span>) : null;

    return (
      <div className={headerClass}>
        <h3>{this.getDateName(this.props.dateScheduled)}</h3>
        <img src={padlock} alt="locked" className={lockClass} />
        {pointer}
        <CardLabel
          label={this.props.label}
          editing={this.props.editing}
          handleUpdateLabel={this.props.handleUpdateLabel}
          />
      </div>
    );
  }
}

DateCardHeader.propTypes = {
  toggleEditing: PropTypes.func.isRequired,
  editing: PropTypes.bool.isRequired,
  admin: PropTypes.bool.isRequired,
  dateScheduled: PropTypes.string.isRequired,
  isDisabled: PropTypes.string,
  label: PropTypes.string,
  handleUpdateLabel: PropTypes.func.isRequired
};

export default DateCardHeader;
