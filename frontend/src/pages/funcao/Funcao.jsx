import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './funcao.css';

export default class Funcao extends Component {
    render() {
        return (
            <div className="row container z-depth-2">
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

Funcao = reduxForm({ form: 'Funcao' })(Funcao)