import React from 'react';

import './list.css';

export default props => (
    <div className="row container z-depth-2" id="tabela">
        <div className="col m12">
            <h1 id={props.id_h1}>{props.titulo}</h1>
            <table className="responsive-table highlight" id={props.id}>
                <thead>
                    {props.header}
                </thead>
                <tbody>
                    {props.children}
                </tbody>
            </table>
            {props.pagination}
        </div>
        {props.modal}
    </div>
)