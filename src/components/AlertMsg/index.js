import React from 'react';
import './index.css';

export const AlertMsg = ({message, type}) => {
    return (
        type === 'error' ?
        <div className="message-wrapper-error">
          {message}
        </div> :
        <div className="message-wrapper-success">
          {message}
        </div>
    );
}
