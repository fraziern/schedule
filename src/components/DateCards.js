import React, { Component } from "react";
import DateCard from "./DateCard";
import defaultJSON from "./default.json";

class DateCards extends Component {
  constructor(props) {
    super(props);
    this.state = { dateCards: [] };
    // this.handleLoadJSON = this.handleLoadJSON.bind(this);
  }

  handleLoadJSON(json) {
    this.setState({ dateCards: json.dateCards });
  }

  componentDidMount() {
    // TODO: LOAD JSON from API
    this.handleLoadJSON(defaultJSON);
  }

  render() {
    const dateCards = this.state.dateCards.map((card) =>
      (<DateCard {...card} key={card.dateScheduled} />)
    );

    return (
      <div className="date-cards">
        {dateCards}
      </div>
    );
  }
}

export default DateCards;
