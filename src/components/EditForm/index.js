import React, { Component } from 'react';
import { Row } from './Row';
import { AlertMsg } from '../AlertMsg';
import './index.css';

export default class Form extends Component {
  state = {
    msg: '',
    showMsg: false,
    isModalOpen: false
  };

  onSubmit = e => {
    this.props.onEditFlight(e);
    this.setState(() => ({ isModalOpen: !this.state.isModalOpen }));
  };

  render() {
    return (
      <div>
        {this.state.showMsg ? <AlertMsg message={this.state.msg} /> : null}
        <div className="AddNewFlight-wrapper">
          <div className="form-wrapper">
            <form onSubmit={this.onSubmit}>
              <Row name="from" />
              <Row name="to" />
              <Row name="when" />
              <Row name="time" />
              <Row name="arrivalsTime" />
              <Row name="airline" />
              <Row name="website" />
              <Row name="noBooking" />
              <Row name="price" />
              <Row name="baggage" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}