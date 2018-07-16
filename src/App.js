import React, { Component } from 'react';
import axios from 'axios';
import { password } from './config';
import Flights from './components/Flights';
import Form from './components/Form';

class App extends Component {
  state = {
    flights: [],
    value: '',
    msg: '',
    showMsg: ''
  };

  componentDidMount() {
    axios
      .get('http://localhost:3001/flights')
      .then(data => {
        this.setState({ flights: data.data });
      })
      .catch(err => console.log(err));
  }

  onDeleteFlight = noBooking => {
    axios
      .post('http://localhost:3001/flights/remove', { noBooking })
      .then(data => {
        console.log(data.data);
        this.setState({
          flights: data.data,
          msg: 'removed',
          showMsg: !this.state.showMsg
        });
      })
      .catch(err => console.log(err));
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
        {this.state.value === password ? (
          <div className="App">
            <Form />
            <Flights
              flights={this.state.flights}
              onDeleteFlight={this.onDeleteFlight}
              showMsg={this.state.showMsg}
              msg={this.state.msg}
            />
          </div>
        ) : (
          <div>You dont have rigths to see this</div>
        )}
      </div>
    );
  }
}

export default App;
