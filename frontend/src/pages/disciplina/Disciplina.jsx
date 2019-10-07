import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './disciplina.css';

export default class Disciplina extends Component {
    render() {
        return (
            <div className="row container z-depth-2">
                <form>
                    <div className="col m12" id="painel">
                        <h1>Cadastro de Disciplina</h1>
                        <div className="row">
                            <Field name="nome" component={InputAndLabel}
                                icone='import_contacts' idAndFor='nome'
                                type='text' label='Nome da Disciplina'
                                typeInput='input-field col m4' />
                        </div>
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn'
                                icone='arrow_back' name='Voltar' />
                            <Button class='waves-effect waves-light btn'
                                icone='send' name='Cadastrar' />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

Disciplina = reduxForm({ form: 'Disciplina' })(Disciplina)