import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Slot from "./Slot";
import CreateNewSlot from "./CreateNewSlot";
import DateCardHeader from "./DateCardHeader";
import { updateAssignment, updateLabel, markUnsaved, addSlotToCard, deleteSlotFromCard, deleteCard } from "../actions";

class DateCard extends Component {

  constructor(props) {
    super(props);
    this.handleChangesIfNeeded = this.handleChangesIfNeeded.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.state = { editing: false };
  }

  handleChangesIfNeeded(slotId) {
    this.props.markUnsaved(slotId);
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
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
      (<Slot {...slot}
        key={slot.id}
        admin={this.props.admin}
        editing={this.state.editing}
        isDisabled={this.props.isDisabled}
        handleDeleteSlot={this.props.handleDeleteSlot}
        handleChangesIfNeeded={this.handleChangesIfNeeded}
        handleUpdateAssignment={this.props.handleUpdateAssignment}
      />)
    );
  }

  render() {
    return (
      <div className="datecard panel panel-default" id={this.props.id}>

        <DateCardHeader
          dateScheduled={this.props.dateScheduled}
          isDisabled={this.props.isDisabled}
          admin={this.props.admin}
          editing={this.state.editing}
          toggleEditing={this.toggleEditing}
          label={this.props.label}
          handleUpdateLabel={this.props.handleUpdateLabel}
          handleDeleteCard={this.props.handleDeleteCard}
          />

        <table className="table table-hover">
          <tbody>
            {this.getFilteredSlots()}
            { (this.props.admin && this.state.editing) ? (<CreateNewSlot handleAddSlot={this.props.handleAddSlot}/>) : null }
          </tbody>
        </table>

      </div>
    );
  }
}

DateCard.propTypes = {
  handleUpdateAssignment: PropTypes.func.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  handleDeleteSlot: PropTypes.func.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  handleAddSlot: PropTypes.func.isRequired,
  label: PropTypes.string,
  markUnsaved: PropTypes.func.isRequired,
  dateScheduled: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  slots: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  admin: PropTypes.bool
};

function mapStateToProps(state) {
  return {
    filter: state.assignments.filter
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    handleUpdateAssignment: (slotID, assignee) => {
      dispatch(updateAssignment(slotID, assignee));
    },
    handleUpdateLabel: (label) => {
      dispatch(updateLabel(ownProps.id, label));
    },
    markUnsaved: (id) => {
      dispatch(markUnsaved(id));
    },
    handleAddSlot: (text) => {
      dispatch(addSlotToCard(text, ownProps.id));
    },
    handleDeleteSlot: (slotID) => {
      dispatch(deleteSlotFromCard(ownProps.id, slotID));
    },
    handleDeleteCard: () => {
      dispatch(deleteCard(ownProps.id));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateCard);
