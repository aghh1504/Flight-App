import React, { Component } from 'react';
import { Row } from './Row';
import { AlertMsg } from '../AlertMsg';
import './index.css';

export default class Form extends Component {
  state = {
    msg: '',
    showMsg: false,
    isModalOpen: false,
    from: this.props.flight.from,
    to: this.props.flight.to,
    when: this.props.flight.when,
    time: this.props.flight.time,
    arrivalsTime: this.props.flight.arrivalsTime,
    airline: this.props.flight.airline,
    website: this.props.flight.website,
    noBooking: this.props.flight.noBooking,
    price: this.props.flight.price,
    baggage: this.props.flight.baggage,
  };

  onSubmit = e => {
    this.props.onEditFlight(e);
    this.setState(() => ({ isModalOpen: !this.state.isModalOpen }));
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    const {from,
    to,
    when,
    time,
    arrivalsTime,
    airline,
    website,
    noBooking,
    price,
    baggage} = this.state;
    console.log('from',from);
    return (
      <div>
        {this.state.showMsg ? <AlertMsg message={this.state.msg} /> : null}
        <div className="AddNewFlight-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.onSubmit}>
              <Row name="from" value={from} onChange={this.onChange}/>
              <Row name="to" value={to} onChange={this.onChange}/>
              <Row name="when" value={when} onChange={this.onChange}/>
              <Row name="time" value={time} onChange={this.onChange}/>
              <Row name="arrivalsTime" value={arrivalsTime} onChange={this.onChange}/>
              <Row name="airline" value={airline} onChange={this.onChange}/>
              <Row name="website" value={website} onChange={this.onChange}/>
              <Row name="noBooking" value={noBooking} onChange={this.onChange}/>
              <Row name="price" value={price} onChange={this.onChange}/>
              <Row name="baggage" value={baggage} onChange={this.onChange}/>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
