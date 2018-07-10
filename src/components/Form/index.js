import React, { Component } from 'react';
import {Row} from './Row';
import './index.css';

export default class Form extends Component {

  render() {
    return (
      <div className="form-wrapper">
        <form>
          <Row name='From'/>
          <Row name='To'/>
          <Row name='When'/>
          <Row name='Time'/>
          <Row name='Airline'/>
          <Row name='Website'/>
          <Row name='No. Booking'/>
          <Row name='Price'/>
          <Row name='Baggage'/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
