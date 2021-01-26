import React, { Component } from 'react';
import { Row } from './Row';
import { AlertMsg } from '../AlertMsg';
import './index.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    const {
      flight: {
        from,
        to,
        when,
        time,
        arrivalsTime,
        airline,
        website,
        noBooking,
        price
      }
    } = props;

    this.state = {
      msg: '',
      showMsg: false,
      from,
      to,
      when,
      time,
      arrivalsTime,
      airline,
      website,
      noBooking,
      price,
      baggage: props.flight.baggage
    };
  }

  onSubmit = e => {
    const { msg, showMsg, ...formValues } = this.state;
    e.preventDefault();
    this.props.onEditFlight(formValues);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
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
    } = this.state;
    return (
      <div>
        {this.state.showMsg && <AlertMsg message={this.state.msg} />}
        <div className="AddNewFlight-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.onSubmit}>
              <Row name="from" value={from} onChange={this.onChange} />
              <Row name="to" value={to} onChange={this.onChange} />
              <Row name="when" value={when} onChange={this.onChange} />
              <Row name="time" value={time} onChange={this.onChange} />
              <Row
                name="arrivalsTime"
                value={arrivalsTime}
                onChange={this.onChange}
              />
              <Row name="airline" value={airline} onChange={this.onChange} />
              <Row name="website" value={website} onChange={this.onChange} />
              <Row
                name="noBooking"
                value={noBooking}
                onChange={this.onChange}
              />
              <Row name="price" value={price} onChange={this.onChange} />
              <Row name="baggage" value={baggage} onChange={this.onChange} />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
