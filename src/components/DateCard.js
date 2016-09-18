import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import AssignmentRow from "./AssignmentRow";
import { unsavedChanges, updateAssignment } from "../actions";

class DateCard extends Component {

  // componentDidUpdate() {
  //   const { save } = this.props;
  //
  //   if (this.saveTimeout) clearTimeout(this.saveTimeout);
  //   this.saveTimeout = setTimeout(save, 1000);
  // }

  constructor(props) {
    super(props);
    this.handleChangesIfNeeded = this.handleChangesIfNeeded.bind(this);
    this.handleUpdateAssignment = this.handleUpdateAssignment.bind(this);
  }

  handleChangesIfNeeded() {
    if (!this.props.unsavedChanges) this.props.flagChanges();
  }

  handleUpdateAssignment(slotID, assignee) {
    this.props.updateAssignment(slotID, assignee);
  }

  getDateName(JSONDateIn) {
    const dateIn = new Date(JSONDateIn);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return MONTHS[dateIn.getUTCMonth()] + " " + dateIn.getUTCDate() + ", " + dateIn.getUTCFullYear();
  }

  render() {
    const disabled = this.props.cardDisabled || "";
    const headerClass = "card-date-container " + ((disabled === "true") ? "card-date-container-disabled" : "");

    let rows = this.props.slots.map((slot) =>
      (<AssignmentRow {...slot} key={slot.id} cardDisabled={disabled} id={slot.id} handleChangesIfNeeded={this.handleChangesIfNeeded} handleUpdateAssignment={this.handleUpdateAssignment} />)
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

DateCard.PropTypes = {
  unsavedChanges: PropTypes.bool.isRequired,
  flagChanges: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    unsavedChanges: state.unsavedChanges
  };
}

function mapDispatchToProps(dispatch) {
  return {
    flagChanges: () => {
      dispatch(unsavedChanges());
    },
    updateAssignment: (id, assignee) => {
      dispatch(updateAssignment(id, assignee));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateCard);
