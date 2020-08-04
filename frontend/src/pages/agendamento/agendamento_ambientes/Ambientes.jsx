import React, { Component, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from './agendamento_ambienteActions';

import InputAndLabel from '../../../componentes/common/InputAndLabel';
import Button from '../../../componentes/common/button';
import M from 'materialize-css/dist/js/materialize.min.js';
import Api from '../../../Api';
import Select from '../../../componentes/common/Select';

class Ambientes extends Component {
    constructor() {
        super();
        this.state = {
            dados: {
                por_periodo: 0,
                mesSelecionado: new Date().getMonth(),
                periodo: '',
                ambiente: '',
            },
            ambientes: [],
            id_ambiente: null
        }
        this.handlerMonth = this.handlerMonth.bind(this);
        this.handlerPeriodo = this.handlerPeriodo.bind(this);
    }

    async componentDidMount() {
        const ambientes = await Api.buscarAmbiente();

        this.setState({
            ambientes: ambientes.data.dados,
        })
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var options = document.querySelectorAll('option');
            M.FormSelect.init(elems, options);
        });
    }

    handlerMonth(event) {
        this.setState({
            dados: {
                ...this.state.dados,
                mesSelecionado: event.target.value
            }
        });
    }

    handlerPeriodo(event) {
        this.setState({
            dados: {
                ...this.state.dados,
                periodo: event.target.value
            }
        });
    }

    async redirecionarAgendamento() {
        const { history, clickButtonEdit } = this.props;
        const ambiente = await Api.buscarAmbiente(this.state.id_ambiente)
        console.log("oi lab ", this.state.dados);
        this.setState({
            dados: {
                ...this.state.dados,
                ambiente: ambiente.data.dados[0]
            }
        })
        clickButtonEdit(this.state.dados);
        history.push('/app/agendamento');
    }

    renderOptionsAmbientes() {
        const ambientes = this.state.ambientes || [];

        let lista = [];
        lista = ambientes.map((item, index) => (
            <option key={index + 1} value={item.id_ambiente}>{item.nome_ambiente}</option>)
        );

        lista.unshift(<option key="0" value='' selected>Selecione uma opção</option>);
        return lista;
    }

    render() {
        return (
            <div className='row left-align row container z-depth-1'>
                <form className='col s12 m12 l12'>
                    <h1>Agendamento de Ambientes</h1>
                    <div className='row mes_agendamento'>
                        <div className='col s4 m4 l4'>
                            <h2>Escolha um Mês</h2>
                        </div>
                        <div className='col s8 m8 l8'>
                            <label>Mês</label>
                            <select className="input-field" value={this.state.dados.mesSelecionado} onChange={this.handlerMonth}>
                                <option value="0">Janeiro</option>
                                <option value="1">Fevereiro</option>
                                <option value="2">Março</option>
                                <option value="3">Abril</option>
                                <option value="4">Maio</option>
                                <option value="5">Junho</option>
                                <option value="6">Julho</option>
                                <option value="7">Agosto</option>
                                <option value="8">Setembro</option>
                                <option value="9">Outubro</option>
                                <option value="10">Novembro</option>
                                <option value="11">Dezembro</option>
                            </select>
                        </div>
                    </div>
                    <div className='row periodo_agendamento'>
                        <div className='col s4 m4 l4'>
                            <h2>Escolha um Período</h2>
                        </div>
                        <div className="col s8 m8 l8">
                            <label>Período</label>
                            <select className="input-field" onChange={this.handlerPeriodo}>
                                <option value="" disabled selected>Selecione uma opção</option>
                                <option value="Matutino">Matutino</option>
                                <option value="Vespertino">Vespertino</option>
                                <option value="Noturno">Noturno</option>
                            </select>
                        </div>
                    </div>
                    <div className='row lab_agendamento'>
                        <div className='col s4 m4 l4'>
                            <h2>Escolha um Ambiente</h2>
                        </div>
                        <div className="input-field col s8 m8 l8">
                            <Select
                                id='ambientes'
                                label='Ambientes'
                                value={this.state.id_ambiente}
                                onChange={e =>
                                    this.setState({
                                        ...this.state,
                                        id_ambiente: e.target.value
                                    })}>
                                {this.renderOptionsAmbientes()}
                            </Select>
                        </div>
                    </div>
                    <div className='row lab_agendamento right-align'>
                        <div className='col s12 m12 l12'>
                            <Button
                                id="btn_agendamento"
                                class='waves-light btn '
                                classIcon='right'
                                icone='forward'
                                name='Ir para o Agendamento'
                                onClick={() => this.redirecionarAgendamento()}
                                type='button' />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = store => ({ agendamento_ambiente: store.agendamentoAmbienteReducer.agendamento_ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Ambientes)