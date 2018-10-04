//@flow

import React, { Component } from 'react';
import axios from 'axios';
// import { password } from './config';
import Flights from './components/Flights';
import Form from './components/Form';
import EditForm from './components/EditForm';

type Props = {};

type State = {
  flights: Array<{ noBooking: string }>,
  flight: {},
  closeModal: boolean,
  editModal: boolean,
  value: string,
  msg: string,
  showMsg: boolean
};

type Fields = {
  from: { value: string },
  to: { value: string },
  when: { value: string },
  time: { value: string },
  arrivalsTime: { value: string },
  airline: { value: string },
  website: { value: string },
  noBooking: { value: string },
  price: { value: string },
  baggage: { checked: boolean }
};

class App extends Component<Props, State> {
  state = {
    flights: [],
    flight: {},
    closeModal: false,
    editModal: false,
    value: '',
    msg: '',
    showMsg: false
  };

  componentDidMount() {
    axios
      .get('http://localhost:3001/flights')
      .then(data => {
        this.setState({ flights: data.data });
      })
      .catch(err => console.log(err));
  }

  onDeleteFlight = (noBooking: string) => {
    axios
      .post('http://localhost:3001/flights/remove', { noBooking })
      .then(data => {
        this.setState({
          flights: data.data,
          msg: 'removed',
          showMsg: !this.state.showMsg
        });
      })
      .catch(err => console.log(err));
  };

  onChange = (e: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value });
  };

  onAddFlight = (
    e: { currentTarget: Fields } & SyntheticEvent<HTMLFormElement>
  ) => {
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
    } = e.currentTarget;
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

  update = (noBooking: string) => {
    const flight = this.state.flights.find(
      flight => flight.noBooking === noBooking
    );
    this.setState({ editModal: !this.state.editModal, flight: flight });
  };

  onEditFlight = (flight: {}) => {
    axios
      .post('http://localhost:3001/flights/editFlight', {
        flights: flight
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
            <EditForm
              onEditFlight={this.onEditFlight}
              flight={this.state.flight}
            />
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
