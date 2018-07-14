import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import './index.css';

export default class Flights extends Component {

  state= {
    flights: []
  }

  componentDidMount() {
    axios.get('http://localhost:3001/flights')
        .then( data => {
              this.setState({flights: data.data})
        }).catch(err => console.log(err));
 }

   timeToGo = (when) => {
     const now = new Date();
     const yearNow = now.getFullYear();
     const monthNow = now.getMonth();
     const dayOfMonthNow = now.getDate();
     const timeNow  = `${yearNow}/${monthNow > 11 ? monthNow : '0'+monthNow}/${dayOfMonthNow}`.split('/');
     const then = when ? `${when.split('-')}` : alert('need to br fill in');
     const diff = moment.duration(moment(then).diff(moment(timeNow)));
     const days = parseInt(diff.asDays());

     return `${days} days`;
   }

  render() {
    const {flights} = this.state
    return (
      <div className="flights-wrapper">
        {
          flights.map(flight => {
            return (
              <div className="flights-table">
              <table className="table-flight">
                <tr>
                  <th>{flight.from}</th>
                  <th></th>
                  <th>{flight.to}</th>
                </tr>
                <tr>
                  <td><FontAwesome name='globe' size='4x' /></td>
                  <td><FontAwesome name='plane' size='2x' /></td>
                  <td><FontAwesome name='globe' size='4x' /></td>
                </tr>
                <tr>
                  <td>{flight.time}</td>
                  <td>{flight.when}</td>
                  <td>{flight.arrivalsTime}</td>
                </tr>
                  <div className="time-to-go">Time to go : {this.timeToGo(flight.when)}</div>
              </table>
              <table className="table-sum">
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
                  <th>Linie</th>
                  <td>{flight.airline}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{flight.price}</td>
                </tr>
                {
                  flight.baggage ?
                    <tr>
                    <th>Baggage</th>
                    <td>Included</td>
                  </tr>  : null
                }
              </table>
            </div>
            )
          })
        }
      </div>
    );
  }
}
