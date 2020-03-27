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
            dados: {
                id_funcao: '',
                nome: '',
            },
        }
        this.handleClick = this.handleClick.bind(this);
    }

    limparCampos() {
        this.setState({
            dados: {
                id_funcao: '',
                nome: '',
            },
        });
    }

    componentDidMount() {
        M.AutoInit();
    }

    async handleClick() {
        await Api.salvarFuncao(this.state.dados);
        this.limparCampos();
    }

    render() {
        const { clickButtonEdit, funcao } = this.props;

        if (this.props.funcao.acao == 'edit') {
            this.setState({
                dados: {
                    id_funcao: this.props.funcao.value.id_funcao,
                    nome: this.props.funcao.value.nome,
                },
            });
            clickButtonEdit('', '');
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
                                                nome: event.target.value
                                            }
                                        })}
                                        value={this.state.dados.nome} />
                                </div>
                                <div className='row right-align' id='botoes'>
                                    <Button class='waves-effect waves-light btn modal-close'
                                        classIcon='right'
                                        icone='clear' name='Cancelar'
                                        onClick={() => this.limparCampos()} />
                                    <Button class='waves-effect waves-light btn modal-close'
                                        classIcon='right'
                                        icone='send' name='Cadastrar'
                                        onClick={() => this.handleClick()} />
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