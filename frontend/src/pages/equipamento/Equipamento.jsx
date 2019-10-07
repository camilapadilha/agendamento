import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './equipamento.css';

export default class Equipamento extends Component {
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <div className="row">
                <div className="col m12 container">
                    <div className="row">
                        <div className="right-align" id="botaoAdd">
                            <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal1"><i class="material-icons">add</i></a>
                        </div>

                        <div id="modal1" className="modal modal-fixed-footer">
                            <div className="modal-content">
                                <form>
                                    <h1>Cadastro de Equipamentos Multimídia</h1>
                                    <Field name="nome" component={InputAndLabel}
                                        icone='add_to_queue' idAndFor='nome'
                                        type='text' label='Nome do Equipamento'
                                        typeInput='input-field col m4' />
                                    <Field name="marca" component={InputAndLabel}
                                        icone='local_offer' idAndFor='marca'
                                        type='text' label='Marca'
                                        typeInput='input-field col m4' />
                                    <Field name="modelo" component={InputAndLabel}
                                        icone='add_to_queue' idAndFor='modelo'
                                        type='text' label='Modelo'
                                        typeInput='input-field col m4' />
                                    <div class="input-field col s6">
                                        <i className="material-icons prefix">mode_edit</i>
                                        <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                                        <label for="icon_prefix2">Descrição</label>
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
                </div>
            </div>
        )
    }
}

Equipamento = reduxForm({ form: 'Equipamento' })(Equipamento)