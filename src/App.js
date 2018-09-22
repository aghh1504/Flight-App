import React, { Component } from 'react';
import axios from 'axios';
// import { password } from './config';
import Flights from './components/Flights';
import Form from './components/Form';

class App extends Component {
  state = {
    flights: [],
    value: '',
    msg: '',
    showMsg: '',
    closeModal: false
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

  onAddFlight = e => {
    e.preventDefault();
    const {
      from,
      to,
      when,
      time,
      arrivalsTime,
      airline,
      website,
      noBooking,
      price,
      baggage
    } = e.target;
    const flights = {
      from: from.value,
      to: to.value,
      when: when.value,
      time: time.value,
      arrivalsTime: arrivalsTime.value,
      airline: airline.value,
      website: website.value,
      noBooking: noBooking.value,
      price: price.value,
      baggage: baggage.checked
    };
    axios
      .post('http://localhost:3001/flights/addFlight', { flights })
      .then(res => {
        this.setState({
          flights: res.data,
          msg: 'added',
          showMsg: !this.state.showMsg,
          closeModal: !this.state.closeModal
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
          <div className="App">
            <Form
              onAddFlight={this.onAddFlight}
              closeModal={this.state.closeModal}
            />
            <Flights
              flights={this.state.flights}
              onDeleteFlight={this.onDeleteFlight}
              showMsg={this.state.showMsg}
              msg={this.state.msg}
            />
          </div>
        )}
      </div>
    );
  }
}

export default App;
