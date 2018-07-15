import React, { Component } from "react";
import { password } from "./config";
import Flights from "./components/Flights";
import Form from "./components/Form";

class App extends Component {
  state = {
    value: ""
  };
  onChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={this.onChange}
            value={this.state.value}
          />
        </form>
        {this.state.value === password
        ? <div className="App">
          <Form />
          <Flights />
        </div> : <div>You dont have rigths to see this</div>
      }
      </div>
    );
  }
}

export default App;
