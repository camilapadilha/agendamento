import React from 'react';

export default props => (
    <>
        <div id="modal1" className="modal">
            <div className="modal-content">
                <h4>Atenção</h4>
                <p>Você deseja mesmo Apagar {props.item}?</p>
            </div>
            <div className="modal-footer">
                <button className="modal-close waves-effect btn"
                    onClick={props.onClick} style={{marginRight:"5px"}}>Sim</button>
                <button className="modal-close waves-effect btn">Não</button>
            </div>
        </div>
    </>
)