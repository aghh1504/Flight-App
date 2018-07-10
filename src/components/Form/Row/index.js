import React from 'react';
import './index.css';

export const Row = ({name}) => {
    return (
        <label>
          {name}:
          {
            name === 'Baggage' ?
              <input type="checkbox" name={name} /> :
              <input type="text" name={name} />
          }
        </label>
    );
}
