import React from "react";
import { SortableHandle } from "react-sortable-hoc";

const DragHandle = SortableHandle(() => <td className="resort-handle">::</td>);

export default DragHandle;
