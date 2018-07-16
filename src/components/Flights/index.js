import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import { AlertMsg } from '../AlertMsg';
import './index.css';

export default class Flights extends Component {
  timeToGo = when => {
    const now = new Date();
    const yearNow = now.getFullYear();
    const monthNow = now.getMonth();
    const dayOfMonthNow = now.getDate();
    const timeNow = `${yearNow}/${
      monthNow > 11 ? monthNow : '0' + monthNow
    }/${dayOfMonthNow}`.split('/');
    const then = when ? `${when.split('-')}` : alert('need to br fill in');
    const diff = moment.duration(moment(then).diff(moment(timeNow)));
    const days = parseInt(diff.asDays());

    return `${days} days`;
  };

  render() {
    const { flights, onDeleteFlight, showMsg, msg } = this.props;
    return (
      <div>
        {showMsg ? <AlertMsg message={msg} type="error" /> : null}
        <div className="flights-wrapper">
          {flights.length === 0 ? (
            <div>No Flights found</div>
          ) : (
            flights.map(flight => {
              return (
                <div className="flights-table" key={flight.noBooking}>
                  <table className="table-flight">
                    <tbody>
                      <tr>
                        <th>{flight.from}</th>
                        <th />
                        <th>{flight.to}</th>
                      </tr>
                      <tr>
                        <td>
                          <FontAwesome name="globe" size="4x" />
                        </td>
                        <td>
                          <FontAwesome name="plane" size="2x" />
                        </td>
                        <td>
                          <FontAwesome name="globe" size="4x" />
                        </td>
                      </tr>
                      <tr>
                        <td>{flight.time}</td>
                        <td>{flight.when}</td>
                        <td>{flight.arrivalsTime}</td>
                      </tr>
                      <tr>
                        <td className="time-to-go">
                          Time to go : {this.timeToGo(flight.when)}
                        </td>
                        <td className="empty-td" />
                        <td>
                          <button
                            className="delete-button"
                            onClick={() => onDeleteFlight(flight.noBooking)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="table-sum">
                    <tbody>
                      <tr>
                        <th>No. Booking</th>
                        <td>{flight.noBooking}</td>
                      </tr>
                      <tr>
                        <th>Date</th>
                        <td>{flight.when}</td>
                      </tr>
                      <tr>
                        <th>Time</th>
                        <td>{flight.time}</td>
                      </tr>
                      <tr>
                        <th>Website</th>
                        <td>{flight.website}</td>
                      </tr>
                      <tr>
                        <th>Line</th>
                        <td>{flight.airline}</td>
                      </tr>
                      <tr>
                        <th>Price</th>
                        <td>{flight.price}</td>
                      </tr>
                      {flight.baggage ? (
                        <tr>
                          <th>Baggage</th>
                          <td>Included</td>
                        </tr>
                      ) : null}
                    </tbody>
                  </table>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}
