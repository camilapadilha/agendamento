import React from 'react';

export default props => (
    <button className={'botao ' + props.class} onClick={props.onClick} style={{marginLeft:"5px"}} href={props.href}>{props.name}
        <i className={'material-icons ' + props.classIcon}>{props.icone}</i>
    </button>
)