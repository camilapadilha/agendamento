import React from 'react';

export default props => (
    <div className={props.typeInput}>
        <i className="material-icons prefix">{props.icone}</i>
        <input id={props.idAndFor} 
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        />
        <label id={props.idLabel} htmlFor={props.idAndFor}>{props.label}</label>
        <span style={{color: 'red'}} id={props.idSpam}>{props.validacao}</span>
    </div>

)
