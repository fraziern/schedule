import React, { Component, PropTypes } from "react";
import padlock from "../img/lock.svg";
import moment from "moment";
import CardLabel from "./CardLabel";
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
    const headerClass = "panel-heading " + ((disabled) ? "panel-heading--disabled" : "");
    const lockClass = (disabled) ? "padlock" : "padlock padlock--hidden";
    const pencilClass = "glyphicon glyphicon-pencil" + ((this.props.editing) ? " pencil--red" : "");

    // TODO: move trashcan and pencil to its own component

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
  isDisabled: PropTypes.bool,
  label: PropTypes.string,
  handleUpdateLabel: PropTypes.func.isRequired,
  handleDeleteCard: PropTypes.func.isRequired
};

export default DateCardHeader;
