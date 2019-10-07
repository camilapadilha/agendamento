import React from 'react';

export default props => (
    <a className={props.class}>
        <i className='material-icons right'>{props.icone}</i>
        {props.name}
    </a>
)