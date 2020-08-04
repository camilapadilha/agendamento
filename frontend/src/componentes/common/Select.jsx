import React from 'react';

export default props => (
  <>
    <select id={props.id} onChange={props.onChange} value={props.value}>
      {props.children}
    </select>
    <label>{props.label}</label>
    <span style={{ color: 'red' }} id={props.idSpam}>{props.validacao}</span>
  </>
)