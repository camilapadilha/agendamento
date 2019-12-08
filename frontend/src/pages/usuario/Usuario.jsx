import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { reduxForm, Field } from 'redux-form';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Select from '../../componentes/common/Select';
import Option from '../../componentes/common/Option';
import Checkbox from '../../componentes/common/checkbox';
import Button from '../../componentes/common/button';
import './Usuario.css';

import "firebase/database";

export default class Usuario extends Component {
    constructor(){
        super();
        this.state = {
            nome: '',
            senha: '',
        }
    }
    componentDidMount() {
        M.AutoInit();
    }
    render() {
        return (
            <div className="row">
                <div className="right-align" id="botaoAdd">
                    <a className="modal-trigger" href="#modal">Cadastre-se</a>
                </div>

                <div id="modal" className="modal modal-fixed-footer">
                    <div className="modal-content">

                        <h1>Cadastro de Usuário</h1>
                        <div id='painel'>
                            <h1>Dados Pessoais</h1>

                            <Field name="nome" component={InputAndLabel}
                                icone='account_circle' idAndFor='nome'
                                type='text' label='Nome Completo'
                                typeInput='input-field col m4' />

                            <Field name="cpf" component={InputAndLabel}
                                icone='credit_card' idAndFor='cpf'
                                type='text' label='CPF'
                                typeInput='input-field col m4' />
                            <Field name="celular" component={InputAndLabel}
                                icone='phone' idAndFor='celular'
                                type='text' label='Celular'
                                typeInput='input-field col m4' />

                            <div id='centralizar'>
                                <Field name="emailPessoal" component={InputAndLabel}
                                    icone='contact_mail' idAndFor='emailPessoal'
                                    type='text' label='Email Pessoal'
                                    typeInput='input-field col m4' />
                                <Field name='Função' component={Select}
                                    label='Selecione sua Função'>
                                    <Option value='professor' name='Professor' />
                                    <Option value='agenteEdu' name='Agente Educacional' />
                                </Field>

                            </div>

                            <div id='disciplinas'>
                                <h1>Disciplinas</h1>
                                <Field name='Disciplinas' component={Checkbox}
                                    span='Matemática' />
                                <Field name='Disciplinas' component={Checkbox}
                                    span='Português' />
                                <Field name='Disciplinas' component={Checkbox}
                                    span='História' />
                                <Field name='Disciplinas' component={Checkbox}
                                    span='Filosofia' />
                                <Field name='Disciplinas' component={Checkbox}
                                    span='Química' />
                            </div>

                        </div>

                        <div id='painel'>
                            <h1>Dados de Acesso</h1>

                            <Field name="emailInstitucional" component={InputAndLabel}
                                icone='mail_outline' idAndFor='emailInstitucional'
                                type='text' label='Email Institucional'
                                typeInput='input-field col m4' />
                            <Field name="senha" component={InputAndLabel}
                                icone='lock_outline' idAndFor='senha'
                                type='password' label='Senha'
                                typeInput='input-field col m4' />
                            <Field name="confirmarSenha" component={InputAndLabel}
                                icone='lock_outline' idAndFor='confirmarSenha'
                                type='password' label='Confirmar Senha'
                                typeInput='input-field col m4' />
                        </div>
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

Usuario = reduxForm({ form: 'Usuario' })(Usuario)