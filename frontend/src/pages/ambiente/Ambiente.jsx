import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import './Ambiente.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

export default class Ambiente extends Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <div className="row">
                <div className="right-align" id="botaoAdd">
                    <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                </div>

                <div id="modal" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <form>
                            <h1>Cadastro de Ambiente</h1>
                            <Field name="nome" component={InputAndLabel}
                                icone='home' idAndFor='nome'
                                type='text' label='Nome do Ambiente'
                                typeInput='input-field col m4' />

                            <Field name="numSala" component={InputAndLabel}
                                icone='home' idAndFor='numSala'
                                type='text' label='Número do Ambiente'
                                typeInput='input-field col m4' />

                            <Field name="capacidadePub" component={InputAndLabel}
                                icone='group' idAndFor='capacidadePub'
                                type='text' label='Capacidade de Público'
                                typeInput='input-field col m4' />

                            <Field name="quantComp" component={InputAndLabel}
                                icone='desktop_windows' idAndFor='quantComp'
                                type='text' label='Quantidade de Computadores'
                                typeInput='input-field col m4' />

                            <div className="radioPI">
                                <h1>Possui Internet</h1>
                                <p>
                                    <label>
                                        <input name="possuiInternet" type="radio" />
                                        <span>Sim</span>
                                    </label>
                                    <label>
                                        <input name="possuiInternet" type="radio" />
                                        <span>Não</span>
                                    </label>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                icone='clear' name='Cancelar' />
                            <Button class='waves-effect waves-light btn'
                                icone='send' name='Cadastrar' />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
Ambiente = reduxForm({ form: 'Ambiente' })(Ambiente)
