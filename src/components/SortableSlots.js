import React from "react";
import { SortableContainer } from "react-sortable-hoc";
import CreateNewSlot from "./CreateNewSlot";

const SortableSlots = SortableContainer(
  ({ slots, isEditing, handleAddSlot }) => {
    return (
      <table className="table table-hover">
        <tbody>
          {slots}
          {isEditing ? <CreateNewSlot handleAddSlot={handleAddSlot} /> : null}
        </tbody>
      </table>
    );
  }
);

export default SortableSlots;
