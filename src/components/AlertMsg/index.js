import React from 'react';
import './index.css';

export const AlertMsg = ({message}) => {
    return (
        <div className="message-wrapper">
          {message}
        </div>
    );
}
