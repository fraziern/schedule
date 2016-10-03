import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Slot from "./Slot";
import CreateNewSlot from "./CreateNewSlot";
import DateCardHeader from "./DateCardHeader";
import { updateAssignment, markUnsaved, addSlotToCard, deleteSlotFromCard } from "../actions";

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
      <div className="datecard panel panel-default">

        <DateCardHeader dateScheduled={this.props.dateScheduled} isDisabled={this.props.isDisabled} admin={this.props.admin} toggleEditing={this.toggleEditing}/>

        <table className="table table-hover">
          <tbody>
            {this.getFilteredSlots()}
            { (this.props.admin && this.state.editing) && <CreateNewSlot handleAddSlot={this.props.handleAddSlot}/> }
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
    handleUpdateAssignment: (id, assignee) => {
      dispatch(updateAssignment(id, assignee));
    },
    markUnsaved: (id) => {
      dispatch(markUnsaved(id));
    },
    handleAddSlot: (text) => {
      dispatch(addSlotToCard(text, ownProps.id));
    },
    // TODO create action for this
    handleDeleteSlot: (slotID) => {
      dispatch(deleteSlotFromCard(ownProps.id, slotID));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateCard);
