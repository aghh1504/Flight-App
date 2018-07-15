import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import axios from 'axios';
import moment from 'moment';
import {AlertMsg} from '../AlertMsg';
import './index.css';

export default class Flights extends Component {

  state= {
    flights: [],
    msg: '',
    showMsg: false,
  }

  componentDidMount() {
    axios.get('http://localhost:3001/flights')
        .then( data => {
              this.setState({flights: data.data})
        }).catch(err => console.log(err));
 }

 onDeleteFlight = (noBooking) => {
   axios.post('http://localhost:3001/flights/remove', {noBooking})
     .then(data => {
         this.setState({msg: data.data, showMsg: !this.state.showMsg})
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
      <div>
          {
            this.state.showMsg ? <AlertMsg message={this.state.msg}/> : null
          }
        <div className="flights-wrapper">
          {
            flights.map(flight => {
              return (
                <div className="flights-table" key={flight.noBooking}>
                <table className="table-flight">
                    <tbody>
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
                    <tr>
                      <td className="time-to-go">Time to go : {this.timeToGo(flight.when)}</td>
                      <td className="empty-td"></td>
                      <td><button className="delete-button" onClick={() => this.onDeleteFlight(flight.noBooking)}>Delete</button></td>
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
                    {
                      flight.baggage ?
                        <tr>
                        <th>Baggage</th>
                        <td>Included</td>
                      </tr>  : null
                    }
                  </tbody>
                </table>
              </div>
              )
            })
          }
        </div>
    </div>
    );
  }
}
