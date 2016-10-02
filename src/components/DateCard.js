import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Slot from "./Slot";
import CreateNewSlot from "./CreateNewSlot";
import { updateAssignment, markUnsaved, addSlot } from "../actions";
import padlock from "../img/lock.svg";

class DateCard extends Component {

  constructor(props) {
    super(props);
    this.handleChangesIfNeeded = this.handleChangesIfNeeded.bind(this);
    this.handleUpdateAssignment = this.handleUpdateAssignment.bind(this);
  }

  handleChangesIfNeeded(slotId) {
    this.props.markUnsaved(slotId);
  }

  handleUpdateAssignment(slotID, assignee) {
    this.props.updateAssignment(slotID, assignee);
  }

  getDateName(JSONDateIn) {
    const dateIn = new Date(JSONDateIn);
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return MONTHS[dateIn.getUTCMonth()] + " " + dateIn.getUTCDate() + ", " + dateIn.getUTCFullYear();
  }

  getFilteredSlots() {
    let filteredRows = this.props.slots;
    if (this.props.filter !== "ALL") {
      filteredRows = filteredRows.filter((slot) => {
        if (this.props.filter === "VACANT" && slot.assignee.name === "") return true;
        return false;
      });
    }

    return filteredRows.map((slot) =>
      (<Slot {...slot} key={slot.id} cardDisabled={this.props.isDisabled} handleChangesIfNeeded={this.handleChangesIfNeeded} handleUpdateAssignment={this.handleUpdateAssignment} />)
    );
  }

  render() {
    const disabled = this.props.isDisabled;
    const headerClass = "panel-heading " + ((disabled === "true") ? "panel-heading--disabled" : "");
    const lockClass = (disabled === "true") ? "padlock" : "padlock padlock--hidden";

    return (
      <div className="datecard panel panel-default">
        <div className={headerClass}>
          <h3>{this.getDateName(this.props.dateScheduled)}</h3>
          <img src={padlock} alt="locked" className={lockClass} />
        </div>
        <table className="table table-hover">
          <tbody>
            {this.getFilteredSlots()}
            { this.props.admin ? <CreateNewSlot handleAddSlot={this.props.handleAddSlot}/> : "" }
          </tbody>
        </table>
      </div>
    );
  }
}

DateCard.PropTypes = {
  updateAssignment: PropTypes.func.isRequired,
  markUnsaved: PropTypes.func.isRequired,
  dateScheduled: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  isDisabled: PropTypes.string,
  admin: PropTypes.string
};

function mapStateToProps(state) {
  return {
    filter: state.filter
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateAssignment: (id, assignee) => {
      dispatch(updateAssignment(id, assignee));
    },
    markUnsaved: (id) => {
      dispatch(markUnsaved(id));
    },
    handleAddSlot: (text) => {
      dispatch(addSlot(text, ownProps.id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateCard);
