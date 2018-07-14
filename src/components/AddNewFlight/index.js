import React, { Component } from 'react';
import Form from '../Form';
import './index.css';

export default class AddNewFlight extends Component {

  state = {
    isModalOpen: false,
  }

  onModelOpen = () => {
    this.setState({isModalOpen: !this.state.isModalOpen})
  }

  render() {
    const { isModalOpen } = this.state
    return (
      <div className="AddNewFlight-wrapper">
        <button onClick={this.onModelOpen}>Add Flight</button>
        {
          isModalOpen ? <Form isModalOpen={isModalOpen}/> : null
        }
      </div>
    );
  }
}
