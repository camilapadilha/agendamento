import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import './Ambiente.css';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

export default class Ambiente extends Component {
    render() {
        return (
            <div className="row container z-depth-2">
                <form>
                    <div className="col m12" id="painel">
                        <h1>Cadastro de Ambiente</h1>
                        <div className="row">
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

                            <div className='row right-align' id='botoes'>
                                <Button class='waves-effect waves-light btn'
                                    icone='arrow_back' name='Voltar' />
                                <Button class='waves-effect waves-light btn'
                                    icone='send' name='Cadastrar' />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
Ambiente = reduxForm({ form: 'Ambiente' })(Ambiente)
