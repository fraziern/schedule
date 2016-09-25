import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Slot from "./Slot";
import { updateAssignment, markUnsaved } from "../actions";
import padlock from "../../lock.svg";

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

  render() {
    const disabled = this.props.isDisabled || "";
    const headerClass = "panel-heading " + ((disabled === "true") ? "panel-heading--disabled" : "");
    const lockClass = (disabled === "true") ? "padlock" : "padlock padlock--hidden";

    let rows = this.props.slots.map((slot) =>
      (<Slot {...slot} key={slot.id} cardDisabled={disabled} id={slot.id} handleChangesIfNeeded={this.handleChangesIfNeeded} handleUpdateAssignment={this.handleUpdateAssignment} />)
    );

    return (
      <div className="datecard panel panel-default">
        <div className={headerClass}>
          <h3>{this.getDateName(this.props.dateScheduled)}</h3>
          <img src={padlock} alt="locked" className={lockClass} />
        </div>
        <table className="table table-hover">
          <tbody>
            {rows}
          </tbody>
        </table>
      </div>
    );
  }
}

DateCard.PropTypes = {
  updateAssignment: PropTypes.func.isRequired,
  markUnsaved: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    updateAssignment: (id, assignee) => {
      dispatch(updateAssignment(id, assignee));
    },
    markUnsaved: (id) => {
      dispatch(markUnsaved(id));
    }
  };
}

export default connect(
  null,
  mapDispatchToProps
)(DateCard);
