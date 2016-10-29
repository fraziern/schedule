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
    this.handleDeleteCard = this.handleDeleteCard.bind(this);
    this.state = { editing: false };
  }

  handleChangesIfNeeded(slotId) {
    this.props.markUnsaved(slotId);
  }

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  }

  handleDeleteCard() {
    console.log("handleDeleteCard");
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

<<<<<<< 621d6b8e2140f8e9f85c95051220f270ec2e0997
        <DateCardHeader
          dateScheduled={this.props.dateScheduled}
          isDisabled={this.props.isDisabled}
          admin={this.props.admin}
          editing={this.state.editing}
          toggleEditing={this.toggleEditing}
          label={this.props.label}
          handleUpdateLabel={this.props.handleUpdateLabel}
          handleDeleteCard={this.handleDeleteCard}
          />
=======
        <DateCardHeader dateScheduled={this.props.dateScheduled} isDisabled={this.props.isDisabled}
        admin={this.props.admin}
        editing={this.state.editing}
        toggleEditing={this.toggleEditing}
        handleDeleteCard={this.handleDeleteCard}
        />
>>>>>>> added trashcan button, nonfunctional

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

DateCard.propTypes = {
  handleUpdateAssignment: PropTypes.func.isRequired,
  handleDeleteSlot: PropTypes.func.isRequired,
  handleUpdateLabel: PropTypes.func.isRequired,
  handleAddSlot: PropTypes.func.isRequired,
  label: PropTypes.string,
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
