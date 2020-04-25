import React from 'react';

export default props => (
    <button id={props.id} className={'botao ' + props.class} type={props.type}
        onClick={props.onClick} style={{ marginLeft: "5px" }} href={props.href}>{props.name}
        <i className={'material-icons ' + props.classIcon}>{props.icone}</i>
    </button>
)