import React from 'react';

export default props => (
    <div className={props.typeInput}>
        <i className="material-icons prefix">{props.icone}</i>
        <input id={props.idAndFor} 
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        />
        <label htmlFor={props.idAndFor}>{props.label}</label>
    </div>

)
