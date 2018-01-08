import React, { Component, PropTypes } from "react";
import Selector from "./Selector";
import DeleteSlotButton from "./DeleteSlotButton";
import { SortableElement } from "react-sortable-hoc";
import DragHandle from "./DragHandle";
import checkmark from "../img/checkmark.svg";
import spinner from "../img/loading.gif";
import sanitize from "../utils/sanitize";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/fromEvent";
import "rxjs/add/operator/map";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import { AUTOSAVE_TIME } from "../constants/Constants";

class Slot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectorValue: this.props.assignee ? this.props.assignee.name : "",
      focused: false,
      changedSinceSave: false,
      keyListener: null
    };
    this.handleSelectorChange = this.handleSelectorChange.bind(this);
    this.handleSelectorFocus = this.handleSelectorFocus.bind(this);
    this.handleSelectorBlur = this.handleSelectorBlur.bind(this);
    this.handleSelectorEnter = this.handleSelectorEnter.bind(this);
    this.handleDeleteSlotButton = this.handleDeleteSlotButton.bind(this);
    this.registerInput = this.registerInput.bind(this);
  }

  componentDidMount() {
    // RxJS autosave
    var keyListener = Observable.fromEvent(this.input, "keyup")
      .debounceTime(AUTOSAVE_TIME)
      .map(function(ev) {
        return ev.target.value;
      })
      .distinctUntilChanged()
      .map(() => {
        if (this.state.changedSinceSave) {
          this.props.handleUpdateAssignment(
            this.props.id,
            this.state.selectorValue.trim()
          );
          this.setState({ changedSinceSave: false });
        }
      })
      .subscribe();
    this.setState({ keyListener });
  }

  componentWillUnmount() {
    this.state.keyListener.unsubscribe();
  }

  registerInput(input) {
    this.input = input;
  }

  handleDeleteSlotButton(e) {
    e.preventDefault();
    this.props.handleDeleteSlot(this.props.id);
  }

  handleSelectorChange(e) {
    // forbid non-valid characters and limit length
    const cleanedValue = sanitize(e.target.value);
    this.setState({ selectorValue: cleanedValue });
    if (!this.state.changedSinceSave) this.setState({ changedSinceSave: true });
    if (this.props.saved) this.props.handleChangesIfNeeded(this.props.id);
  }

  // These handlers are used to alter CSS
  handleSelectorFocus() {
    this.setState({ focused: true });
  }

  handleSelectorBlur() {
    this.setState({ focused: false });
  }

  // if we hit ENTER then send an update action
  handleSelectorEnter(e) {
    if (e.which === 13 && this.state.changedSinceSave) {
      this.props.handleUpdateAssignment(
        this.props.id,
        this.state.selectorValue.trim()
      );
      this.setState({ changedSinceSave: false });
    }
  }

  render() {
    const checkClass = this.props.saved
      ? "checkmark"
      : "checkmark checkmark--hidden";
    const labelClass = this.state.focused
      ? "slotlabel label--focused"
      : "slotlabel";
    const rowClass = this.state.selectorValue === "" ? "slot danger" : "slot";
    const spinnerClass = this.props.isSaving
      ? "spinner"
      : "spinner spinner--hidden";

    // enable Selector if blank, even if it's in a locked card
    const disable = !this.props.assignee.name ? false : this.props.isDisabled;

    return (
      <tr className={rowClass}>
        {this.props.admin ? (
          <DeleteSlotButton
            handleDeleteSlotButton={this.handleDeleteSlotButton}
            editing={this.props.editing}
          />
        ) : null}
        <td>
          <h4 className={labelClass}>{this.props.assignment.name}</h4>
        </td>
        <td>
          <Selector
            registerInput={this.registerInput}
            assignmentName={this.props.assignment.name}
            selectorValue={this.state.selectorValue}
            handleSelectorChange={this.handleSelectorChange}
            handleSelectorFocus={this.handleSelectorFocus}
            handleSelectorBlur={this.handleSelectorBlur}
            handleSelectorEnter={this.handleSelectorEnter}
            isDisabled={disable}
          />
        </td>
        <td>
          <img src={checkmark} className={checkClass} alt="saved" />
          <img src={spinner} className={spinnerClass} alt="saving" />
        </td>
        {this.props.admin && this.props.editing ? <DragHandle /> : null}
      </tr>
    );
  }
}

Slot.propTypes = {
  handleChangesIfNeeded: PropTypes.func.isRequired,
  assignee: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  handleDeleteSlot: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  saved: PropTypes.bool,
  handleUpdateAssignment: PropTypes.func.isRequired,
  isSaving: PropTypes.bool,
  admin: PropTypes.bool.isRequired,
  editing: PropTypes.bool.isRequired,
  assignment: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string
  }).isRequired,
  isDisabled: PropTypes.bool
};

export default SortableElement(Slot);
