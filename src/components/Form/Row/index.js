import React from 'react';
import './index.css';

export const Row = ({name, checked, onChange}) => {
    return (
        <label>
          {name}:
          {
            name === 'baggage' ?
              <input type="checkbox" name={name} checked={checked} onChange={onChange}/> : name==='when' ?
              <input type="date" name={name} onChange={onChange}/> :
              <input type="text" name={name} onChange={onChange}/>
          }
        </label>
    );
}
