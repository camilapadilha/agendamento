import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './funcao.css';

export default class Funcao extends Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <div className="row">
                <div className="right-align" id="botaoAdd">
                    <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                </div>

                <div id="modal" className="modal">
                    <div className="modal-content">
                        <form>
                            <div className="col m12" id="painel">
                                <h1>Cadastro de Função</h1>
                                <div className="row">
                                    <Field name="nome" component={InputAndLabel}
                                        icone='person' idAndFor='nome'
                                        type='text' label='Nome'
                                        typeInput='input-field col m4' />
                                </div>
                                <div className='row right-align' id='botoes'>
                                    <Button class='waves-effect waves-light btn modal-close'
                                        icone='clear' name='Cancelar' />
                                    <Button class='waves-effect waves-light btn'
                                        icone='send' name='Cadastrar' />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Funcao = reduxForm({ form: 'Funcao' })(Funcao)