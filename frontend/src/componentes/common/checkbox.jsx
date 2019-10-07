import React from 'react';

export default props => (
    <label>
        <input type="checkbox" className={props.class}/>
        <span>{props.span}</span>
    </label>
)