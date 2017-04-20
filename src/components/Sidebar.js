import React, { Component, PropTypes } from "react";
import moment from "moment";
import Menubar from "./Menubar";

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.getDateName = this.getDateName.bind(this);
  }

  // TODO: move this to a higher component?
  getDateName(JSONDateIn) {
    return moment(JSONDateIn).format("MMMM Do, YYYY");
  }

  render() {
    const dates = (this.props.isLoaded) ? this.props.dateCards.map((card) =>
      (<h4 key={card.id}>{this.getDateName(card.dateScheduled)}</h4>)
    ) : null;
    return (
        <div className="sidebar panel panel-default">
          <Menubar admin={this.props.admin} dateCards={this.props.dateCards}/>
          <div className="sidebar-header">Jump To Date</div>
          {dates}
        </div>
    );
  }
}

Sidebar.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  admin: PropTypes.bool,
  cutoffDate: PropTypes.string,
  dateCards: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string,
    dateScheduled: PropTypes.string.isRequired,
    slots: PropTypes.array.isRequired
  }))
};

export default Sidebar;
