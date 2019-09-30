import React from 'react';

export default props => (
    <div className = {props.typeInput}>
        <i className = {props.icon} >{props.nameIcon}</i>
        <input {...props.input} id = {props.id} type={props.type} className={props.class}/>
        <label htmlFor={props.name}>{props.label}</label>
    </div>

)
