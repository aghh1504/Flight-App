import React, { Component } from 'react';
import axios from 'axios';
import { Row } from './Row';
import { AlertMsg } from '../AlertMsg';
import './index.css';

export default class Form extends Component {
  state = {
    msg: '',
    flights: [],
    showMsg: false,
    isChecked: false,
    isModalOpen: false
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChecked = e => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  onModelOpen = () => {
    this.setState({ isModalOpen: true });
  };

  onSubmit = e => {
    this.props.onAddFlight(e);
    this.setState(() => ({ isModalOpen: false }));
  };

  render() {
    return (
      <div>
        {this.state.showMsg ? <AlertMsg message={this.state.msg} /> : null}
        <div className="AddNewFlight-wrapper">
          <button onClick={this.onModelOpen}>Add Flight</button>
          {this.state.isModalOpen ? (
            <div className="form-wrapper">
              <form onSubmit={this.onSubmit}>
                <Row name="from" onChange={this.onChange} />
                <Row name="to" onChange={this.onChange} />
                <Row name="when" onChange={this.onChange} />
                <Row name="time" onChange={this.onChange} />
                <Row name="arrivalsTime" onChange={this.onChange} />
                <Row name="airline" onChange={this.onChange} />
                <Row name="website" onChange={this.onChange} />
                <Row name="noBooking" onChange={this.onChange} />
                <Row name="price" onChange={this.onChange} />
                <Row
                  name="baggage"
                  onChange={this.onChecked}
                  checked={this.state.isChecked}
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}
