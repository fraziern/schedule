// TODO: change admin to a boolean!!

import React, { Component } from "react";
// import { connect } from "react-redux";
// import DateCard from "./DateCard";
import DateCards from "./DateCards";
// import NewCardSelector from "./NewCardSelector";
// import * as fromAssignments from "../reducers/assignments";

class DateCardsAdmin extends Component {

  // constructor(props) {
  //   super(props);
  //   // this.isLocked = this.isLocked.bind(this);
  // }

  // isLocked(cutoff, cardDate) {
  //   if (cutoff > cardDate) return "true";
  //   return "";
  // }

  render() {
    // let dateCards = (!this.props.isLoaded) ?
    //   "Loading..." :
    //  this.props.dateCards.map((card) =>
    //    (<DateCard {...card} key={card.id} admin="true" />)
    //  );

    return (
      // <div>
      //   <div className="datecards">
      //     {dateCards}
      //   </div>
      //   <NewCardSelector />
      // </div>
      <DateCards admin="true" />
    );
  }
}
//
// DateCardsAdmin.propTypes = {
//   isLoaded: PropTypes.bool.isRequired,
//   dateCards: PropTypes.arrayOf(PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     dateScheduled: PropTypes.string.isRequired,
//     slots: PropTypes.arrayOf(PropTypes.shape({
//       assignment: PropTypes.object.isRequired,
//       assignee: PropTypes.object.isRequired,
//       id: PropTypes.string.isRequired
//     }))
//   })).isRequired
// };

// function mapStateToProps(state) {
//   return {
//     dateCards: fromAssignments.getVisibleDateCards(state),
//     unsavedChanges: state.unsavedChanges,
//     isLoaded: state.isLoaded,
//     cutoffDate: state.cutoffDate
//   };
// }

// export default connect(
//   mapStateToProps
// )(DateCardsAdmin);
export default DateCardsAdmin;
