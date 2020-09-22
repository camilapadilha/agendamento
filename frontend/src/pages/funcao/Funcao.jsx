import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './funcaoActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './funcao.css';
import Api from '../../Api';

class Funcao extends Component {

    constructor() {
        super();
        this.state = {
            id_funcao: '',
            dados: {
                nome_funcao: '',
            },
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    limparCampos() {
        this.setState({
            id_funcao: '',
            dados: {
                nome_funcao: '',
            },
        });
    }

    inicializarForms() {
        document.getElementById('label_nome').setAttribute('class', 'active');
    }

    limparInicializacaoForms() {
        document.getElementById('label_nome').setAttribute('class', '');
    }

    limparValidacoes() {
        document.getElementById('validar_nome').innerText = '';
    }

    btnCancelar() {
        this.limparCampos();
        this.limparValidacoes();
        this.limparInicializacaoForms();
    }

    async handleClick() {
        let pode_salvar = true;
        this.limparValidacoes();
        if (this.state.dados.nome_funcao == '') {
            pode_salvar = false;
            document.getElementById('validar_nome').innerText = 'Campo Obrigattório.';
        }
        if (pode_salvar) {
            var elem = document.getElementById('modal');
            var instance = M.Modal.getInstance(elem);
            await Api.salvarFuncao(this.state.dados, this.state.id_funcao);
            instance.close();
            this.limparValidacoes();
            this.limparCampos();
        }
    }

    render() {
        const { clickButtonEdit, funcao } = this.props;

        if (this.props.funcao.acao == 'edit') {
            this.setState({
                id_funcao: this.props.funcao.value.id_funcao,
                dados: {
                    nome_funcao: this.props.funcao.value.nome_funcao,
                },
            });
            clickButtonEdit('', '');
            this.inicializarForms();
        }

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
                                    <InputAndLabel
                                        icone='person' idAndFor='nome'
                                        type='text' label='Nome'
                                        typeInput='input-field col m4'
                                        onChange={event => this.setState({
                                            dados: {
                                                ...this.state.dados,
                                                nome_funcao: event.target.value
                                            }
                                        })}
                                        value={this.state.dados.nome_funcao}
                                        idSpam='validar_nome'
                                        idLabel='label_nome' />
                                </div>
                                <div className='row right-align' id='botoes'>
                                    <Button class='waves-effect waves-light btn modal-close'
                                        classIcon='right'
                                        icone='clear' name='Cancelar'
                                        onClick={() => this.btnCancelar()} />
                                    <Button class='waves-effect waves-light btn '
                                        classIcon='right'
                                        icone='send' name='Cadastrar'
                                        onClick={() => this.handleClick()}
                                        type='button' />
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
const mapStateToProps = store => ({ funcao: store.funcaoReducer.funcao })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Funcao)