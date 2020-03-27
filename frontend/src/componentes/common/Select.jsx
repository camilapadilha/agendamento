import React from 'react';

export default props => (
    <div className="input-field col s4">
    <select onChange={props.onChange} value={props.value}>
      {props.children}
    </select>
    <label>{props.label}</label>
  </div>
)