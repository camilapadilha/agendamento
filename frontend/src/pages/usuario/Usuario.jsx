import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './usuarioActions';

import { reduxForm, Field } from 'redux-form';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Select from '../../componentes/common/Select';
import Option from '../../componentes/common/Option';
import Button from '../../componentes/common/button';
import './Usuario.css';
import Api from '../../Api';

class Usuario extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
            senha: '',
            listFuncao: [],
        }
    }
    async componentDidMount() {
        M.AutoInit();
        const list = await Api.buscarFuncao();
        this.setState({
            listFuncao: list.data.dados,
        })
    }

    renderOptionsFuncao() {
        const list = this.state.listFuncao || [];
        return list.map((item, index) => 
            <option key={index} value={item}>{item.nome}</option>
        );
    }

    render() {
        console.log("aaaaa", this.renderOptionsFuncao());
        
        return (
            <div className="row">
                {this.props.list ?
                    <div className="right-align" id="botaoAdd">
                        <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                    </div>
                    :
                    <div className="right-align" id="botaoAdd">
                        <a className="modal-trigger" href="#modal">Cadastre-se</a>
                    </div>
                }
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

                            <div>
                                <Field name="emailPessoal" component={InputAndLabel}
                                    icone='contact_mail' idAndFor='emailPessoal'
                                    type='text' label='Email Pessoal'
                                    typeInput='input-field col m4' />

                                <Select label='Selecione sua Função'>
                                    {this.renderOptionsFuncao()}
                                </Select>
                            </div>

                            <div>
                                <Select label='Selecione suas disciplinas'>
                                    <Option value='Matemática' name='Matemática' />
                                    <Option value='Português' name='Português' />
                                </Select>
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
                            <Button class='waves-effect waves-light btn modal-close'
                                icone='send' name='Cadastrar' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Usuario = reduxForm({ form: 'Usuario' })(Usuario)
const mapStateToProps = store => ({
    usuario: store.usuarioReducer.usuario,
    funcao: store.funcaoReducer.funcao
})
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Usuario)