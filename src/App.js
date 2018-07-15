import React, { Component } from "react";
import Flights from "./components/Flights";
import Form from "./components/Form";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form />
        <Flights />
      </div>
    );
  }
}

export default App;
