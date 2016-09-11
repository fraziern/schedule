import React, { Component } from "react";
import DateCards from "../components/DateCards";
import Header from "../components/Header";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Header />
        </div>
        <div className="App-body">
          <DateCards />
        </div>
      </div>
    );
  }
}

export default App;
