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
                nome: '',
                num_sala: '',
                capacidade_publico: '',
                quantidade_computadores: '',
                possui_internet: '',
            },
        }
        this.handleClick = this.handleClick.bind(this);
    }
    limparState() {
        this.setState({
            dados: {
                id_ambiente: '',
                nome: '',
                num_sala: '',
                capacidade_publico: '',
                quantidade_computadores: '',
                possui_internet: '',
            },
        });

    }
    componentDidMount() {
        M.AutoInit();
    }

    async handleClick() {
        await Api.salvarAmbiente(this.state.dados);
        this.limparState();
    }
    render() {
        const { clickButtonEdit, ambiente } = this.props;

        if (this.props.ambiente.acao == 'edit') {
            this.setState({
                dados: {
                    id_ambiente: this.props.ambiente.value.id_ambiente,
                    nome: this.props.ambiente.value.nome,
                    num_sala: this.props.ambiente.value.num_sala,
                    capacidade_publico: this.props.ambiente.value.capacidade_publico,
                    quantidade_computadores: this.props.ambiente.value.quantidade_computadores,
                    possui_internet: this.props.ambiente.value.possui_internet,
                },
            });
            clickButtonEdit('', '');
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
                                        nome: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome} />

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
                                value={this.state.dados.num_sala} />

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
                                value={this.state.dados.capacidade_publico} />

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
                                value={this.state.dados.quantidade_computadores} />

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
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.limparState()} />
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='send' name='Cadastrar'
                                onClick={() => this.handleClick()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
Ambiente = reduxForm({ form: 'Ambiente' })(Ambiente)
const mapStateToProps = store => ({ ambiente: store.ambienteReducer.ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Ambiente)
