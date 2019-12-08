import React from 'react';

export default props => (
    <a className={props.class} onClick={props.onClick}>
        <i className='material-icons right'>{props.icone}</i>
        {props.name}
    </a>
)