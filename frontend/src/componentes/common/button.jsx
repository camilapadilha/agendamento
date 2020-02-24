import React from 'react';
import Funcao from '../../pages/funcao/Funcao';

export default props => (
    <a className={props.class} onClick={props.onClick} style={{marginLeft:"5px"}} href={props.href}>
        <i className={'material-icons ' + props.classIcon}>{props.icone}</i>
        {props.name}
    </a>
)