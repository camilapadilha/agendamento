import React from 'react';

export default props => (
    <div className="input-field col s4">
    <select id={props.id} onChange={props.onChange} value={props.value}>
      {props.children}
    </select>
    <label>{props.label}</label>
    <span style={{color: 'red'}} id={props.idSpam}>{props.validacao}</span>
  </div>
)