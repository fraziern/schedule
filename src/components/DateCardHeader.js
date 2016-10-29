import React, { Component, PropTypes } from "react";
import padlock from "../img/lock.svg";
import moment from "moment";
import DeleteCardButton from "./DeleteCardButton";

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
    const pencilClass = "glyphicon glyphicon-pencil" + ((this.props.editing) ? " pencil--red" : "");

    const trashcan = (this.props.admin) ? (<DeleteCardButton handleDeleteCard={this.props.handleDeleteCard}/>) : null;

    const pencil = (this.props.admin) ? (<span onClick={this.handleEditButton} className={pencilClass} aria-hidden="true"></span>) : null;

    return (
      <div className={headerClass}>
        <h3>{this.getDateName(this.props.dateScheduled)}</h3>
        <img src={padlock} alt="locked" className={lockClass} />
        <ul className="list-inline pull-right">
        <li>{trashcan}</li>
        <li>{pencil}</li>
        </ul>
      </div>
    );
  }
}

DateCardHeader.PropTypes = {
  dateScheduled: PropTypes.string.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  isDisabled: PropTypes.string
};

export default DateCardHeader;
