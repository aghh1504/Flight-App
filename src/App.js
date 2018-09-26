import React, { Component } from 'react';
import axios from 'axios';
// import { password } from './config';
import Flights from './components/Flights';
import Form from './components/Form';
import EditForm from './components/EditForm';

class App extends Component {
  state = {
    flights: [],
    flight: {},
    closeModal: false,
    editModal: false,
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

  update = noBooking => {
    console.log('noBooking', noBooking);
    const flight = this.state.flights.find(flight => flight.noBooking === noBooking)
    console.log('flight', flight);
    this.setState({ editModal: !this.state.editModal, flight: flight });
  };

  onEditFlight = e => {
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
      .post('http://localhost:3001/flights/editFlight', {
        flights: flights
      })
      .then(res => {
        this.setState({
          flights: res.data,
          msg: 'Flight updaded',
          showMsg: !this.state.showMsg,
          editModal: !this.state.editModal
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <div className="App">
          <Form onAddFlight={this.onAddFlight} />
          {this.state.editModal ? (
            <EditForm onEditFlight={this.onEditFlight} flight={this.state.flight}/>
          ) : null}
          <Flights
            flights={this.state.flights}
            onDeleteFlight={this.onDeleteFlight}
            update={this.update}
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
