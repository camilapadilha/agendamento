import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './equipamentoActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';
import Api from '../../Api';

import './equipamento.css';

class Equipamento extends Component {
    constructor() {
        super();
        this.state = {
            dados: {
                id_equipamento: '',
                nome: '',
                marca: '',
                modelo: '',
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    limparCampos() {
        this.setState({
            dados: {
                id_equipamento: '',
                nome: '',
                marca: '',
                modelo: '',
            },
        });
    }

    componentDidMount() {
        M.AutoInit();
    }

    async handleClick() {
        await Api.salvarEquipamentos(this.state.dados);
        this.limparCampos();
    }
    render() {
        const { clickButtonEdit } = this.props;

        if (this.props.equipamento.acao == 'edit') {
            console.log("en", this.props.equipamento.value);

            this.setState({
                dados: {
                    id_equipamento: this.props.equipamento.value.id_equipamento,
                    nome: this.props.equipamento.value.nome,
                    modelo: this.props.equipamento.value.modelo,
                    marca: this.props.equipamento.value.marca,
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
                            <h1>Cadastro de Equipamentos Multimídia</h1>
                            <InputAndLabel
                                icone='add_to_queue' idAndFor='nome'
                                type='text' label='Nome do Equipamento'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        nome: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome} />
                            <InputAndLabel
                                icone='local_offer' idAndFor='marca'
                                type='text' label='Marca'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        marca: event.target.value
                                    }
                                })}
                                value={this.state.dados.marca} />
                            <InputAndLabel
                                icone='add_to_queue' idAndFor='modelo'
                                type='text' label='Modelo'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        modelo: event.target.value
                                    }
                                })}
                                value={this.state.dados.modelo} />

                            <div className="input-field col s6">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="icon_prefix2" className="materialize-textarea"></textarea>
                                <label htmlFor="icon_prefix2">Descrição</label>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.limparCampos()} />
                            < Button class='waves-effect waves-light btn modal-close'
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

Equipamento = reduxForm({ form: 'Equipamento' })(Equipamento)
const mapStateToProps = store => ({ equipamento: store.equipamentoReducer.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Equipamento)