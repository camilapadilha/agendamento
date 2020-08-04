import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './ambienteActions';

import './Ambiente.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';
import Api from '../../Api';

class Ambiente extends Component {
    constructor() {
        super();
        this.state = {
            dados: {
                id_ambiente: '',
                nome_ambiente: '',
                num_sala: '',
                capacidade_publico: '',
                quantidade_computadores: '',
                possui_internet: '',
            },
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    limparState() {
        this.setState({
            dados: {
                id_ambiente: '',
                nome_ambiente: '',
                num_sala: '',
                capacidade_publico: '',
                quantidade_computadores: '',
                possui_internet: '',
            },
        });
    }

    inicializarForms() {
        document.getElementById('label_nome').setAttribute('class', 'active');
        document.getElementById('label_num_sala').setAttribute('class', 'active');
        document.getElementById('label_capacidade_pub').setAttribute('class', 'active');
        document.getElementById('label_quant_comp').setAttribute('class', 'active');
    }

    limparInicializacaoForms() {
        document.getElementById('label_nome').setAttribute('class', '');
        document.getElementById('label_num_sala').setAttribute('class', '');
        document.getElementById('label_capacidade_pub').setAttribute('class', '');
        document.getElementById('label_quant_comp').setAttribute('class', '');
    }

    btnCancelar() {
        this.limparState();
        this.limparValidacoes();
        this.limparInicializacaoForms();
    }

    limparValidacoes() {
        document.getElementById('validar_nome').innerText = '';
        document.getElementById('validar_num_sala').innerText = '';
        document.getElementById('validar_capacidade_pub').innerText = '';
    }

    async handleClick() {
        let pode_salvar = true;
        if (this.state.dados.nome_ambiente == '') {
            pode_salvar = false;
            document.getElementById('validar_nome').innerText = 'Campo Obrigatório.';
        }
        if (this.state.dados.num_sala == '') {
            pode_salvar = false;
            document.getElementById('validar_num_sala').innerText = 'Campo Obrigatório.';
        }
        if (this.state.dados.capacidade_publico == '') {
            pode_salvar = false;
            document.getElementById('validar_capacidade_pub').innerText = 'Campo Obrigatório.';
        }
        if (pode_salvar) {
            var elem = document.getElementById('modal');
            var instance = M.Modal.getInstance(elem);
            instance.close();
            await Api.salvarAmbiente(this.state.dados);
            this.limparValidacoes();
            this.limparState();
        }
    }
    render() {
        const { clickButtonEdit, ambiente } = this.props;

        if (this.props.ambiente.acao == 'edit') {
            this.setState({
                dados: {
                    id_ambiente: this.props.ambiente.value.id_ambiente,
                    nome_ambiente: this.props.ambiente.value.nome_ambiente,
                    num_sala: this.props.ambiente.value.num_sala,
                    capacidade_publico: this.props.ambiente.value.capacidade_publico,
                    quantidade_computadores: this.props.ambiente.value.quantidade_computadores,
                    possui_internet: this.props.ambiente.value.possui_internet,
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

                <div id="modal" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <form>
                            <h1>Cadastro de Ambiente</h1>
                            <InputAndLabel
                                icone='home' idAndFor='nome'
                                type='text' label='Nome do Ambiente'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        nome_ambiente: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome_ambiente}
                                idSpam='validar_nome' 
                                idLabel='label_nome'/>

                            <InputAndLabel
                                icone='home' idAndFor='numSala'
                                type='text' label='Número'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        num_sala: event.target.value
                                    }
                                })}
                                value={this.state.dados.num_sala}
                                idSpam='validar_num_sala' 
                                idLabel='label_num_sala'/>

                            <InputAndLabel
                                icone='group' idAndFor='capacidadePub'
                                type='text' label='Capacidade de Público'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        capacidade_publico: event.target.value
                                    }
                                })}
                                value={this.state.dados.capacidade_publico}
                                idSpam='validar_capacidade_pub' 
                                idLabel='label_capacidade_pub'/>

                            <InputAndLabel
                                icone='desktop_windows' idAndFor='quantComp'
                                type='text' label='Quantidade de Computadores'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        quantidade_computadores: event.target.value
                                    }
                                })}
                                value={this.state.dados.quantidade_computadores}
                                idSpam='validar_quant_comp'
                                idLabel='label_quant_comp' />

                            <div className="radioPI">
                                <h1>Possui Internet</h1>
                                <p>
                                    <label>
                                        <input name="possuiInternet" type="radio"
                                            checked={this.state.dados.possui_internet == 1}
                                            onChange={() => this.setState({
                                                dados: {
                                                    ...this.state.dados,
                                                    possui_internet: 1
                                                }
                                            })}
                                            value={this.state.dados.possui_internet} />
                                        <span>Sim</span>
                                    </label>
                                    <label>
                                        <input name="possuiInternet" type="radio"
                                            checked={this.state.dados.possui_internet == 2}
                                            onChange={() => this.setState({
                                                dados: {
                                                    ...this.state.dados,
                                                    possui_internet: 2
                                                }
                                            })}
                                            value={this.state.dados.possui_internet} />
                                        <span>Não</span>
                                    </label>
                                </p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.btnCancelar()} />
                            <Button
                                id="btn_salvar"
                                class='waves-light btn'
                                classIcon='right'
                                icone='send' name='Cadastrar'
                                onClick={() => this.handleClick()}
                                type='button' />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = store => ({ ambiente: store.ambienteReducer.ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Ambiente)
