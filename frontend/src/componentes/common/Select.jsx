import React from 'react';

export default props => (
    <div className="input-field col s4">
    <select>
      <option value="" disabled selected>Escolha uma opção</option>
      {props.children}
    </select>
    <label>{props.label}</label>
  </div>
)