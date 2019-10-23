import React from 'react';

import './list.css';

export default props => (
    <div className="row container z-depth-2">
        <div className="col m12">
            <div className="row" id="tabela">
                <h1>{props.titulo}</h1>
                <table className="responsive-table">
                    <thead>
                        {props.headers}
                    </thead>
                    <tbody>
                        {props.children}
                    </tbody>
                </table>
            </div>
            {props.modal}
        </div>
    </div>
)