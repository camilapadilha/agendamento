import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from '../agendamento/agendamento_ambientes/agendamento_ambienteActions';

// import Select from '../../componentes/common/Select';
// import Option from '../../componentes/common/Option';
import TableAgenda from '../../componentes/common/TableAgenda';
import ModalAgenda from '../../componentes/common/modalAgendamento';
import Button from '../../componentes/common/button';
import M from 'materialize-css';

import './agendamento.css';
import Api from '../../Api';

class Agendamento extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mesSelecionado: new Date().getMonth(),
            ano: new Date().getFullYear(),
            periodo: 'Matutino',
            laboratorio: 'Laboratório 1',
            horario_aula: '',
            dia_semana: '',
            usuario: ''
        };
        this.handlerMonth = this.handlerMonth.bind(this);
        this.handlerPeriodo = this.handlerPeriodo.bind(this);
        this.handlerLaboratorio = this.handlerLaboratorio.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        console.log("teste", this.props.agendamento_ambiente.value);
        if (this.props.agendamento_ambiente.value) {

            this.setState({
                ...this.state,
                mesSelecionado: this.props.agendamento_ambiente.value.mesSelecionado,
                periodo: this.props.agendamento_ambiente.value.periodo,
                laboratorio: this.props.agendamento_ambiente.value.ambiente,
            });

        }
        console.log("state", this.state);
    }

    handlerMonth(event) {
        this.setState({ mesSelecionado: event.target.value });
    }

    handlerPeriodo(event) {
        this.setState({ periodo: event.target.value });
    }

    handlerLaboratorio(event) {
        this.setState({ laboratorio: event.target.value });
    }

    renderRowsDia() {
        var mes = Number(this.state.mesSelecionado);
        var anoAtual = new Date().getFullYear();
        var quantDiasNoMes = new Date(anoAtual, mes + 1, 0).getDate();
        var diaIniciaMes = new Date(anoAtual, mes, 1).getDay();

        var rows = [];
        var i;
        var x = 0;
        do {
            if (diaIniciaMes == 0) {
                for (i = 2; i <= quantDiasNoMes; i++) {
                    rows.push(<th>Dia {i}</th>)
                }
                break
            }
            x += 1;
            if (diaIniciaMes == x) {
                for (i = 1; i <= quantDiasNoMes; i++) {
                    rows.push(<th>Dia {i}</th>)
                }
                break
            }
            else {
                rows.push(<th>__</th>);
            }

        } while (x != diaIniciaMes)

        return rows
    }

    converterMes(mes) {
        switch (mes) {
            case '0':
                return 'Janeiro'
            case '1':
                return 'Fevereiro'
            case '2':
                return 'Março'
            case '3':
                return 'Abril'
            case '4':
                return 'Maio'
            case '5':
                return 'Junho'
            case '6':
                return 'Julho'
            case '7':
                return 'Agosto'
            case '8':
                return 'Setembro'
            case '9':
                return 'Outubro'
            case '10':
                return 'Novembro'
            case '11':
                return 'Dezembro'
        }
    }

    handlerHorario() {
        console.log("aeeeeeee", this.state);
        let data = '';
        Api.salvarHorarioAmbiente(this.state)
    }

    handlerDiaAgendamento(init, end, c) {
        const listaDias = this.renderRowsDia().slice(init, end);
        // const dia = "0" + listaDias[c].props.children[1] + '-' + '0' + this.state.mesSelecionado + '-' + this.state.ano;
        const dia = this.state.ano + '-' + "0" + this.state.mesSelecionado + '-' +'0'+ listaDias[c].props.children[1];
        console.log("diaaaaaaa", dia);
        this.setState({
            ...this.state,
            horario_aula: '1',
            dia_semana: dia
        })

    }

    render() {
        return (
            <div className="row">
                <form>
                    <div className="col s12 m12 l12 ">
                        <div className="col m2 ">
                            <a class="waves-light " href='/app/agendamento_ambiente'> <i className="material-icons small">arrow_back</i></a>
                        </div>
                        <div className="row" id="filtros">
                            <div className="col m3">
                                <label>Mês</label>
                                <select className="input-field" value={this.state.mesSelecionado} onChange={this.handlerMonth}>
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
                            <div className="col m3">
                                <label>Período</label>
                                <select className="input-field" onChange={this.handlerPeriodo}>
                                    <option value="" disabled selected>Escolha o período</option>
                                    <option value="Matutino">Matutino</option>
                                    <option value="Vespertino">Vespertino</option>
                                    <option value="Noturno">Noturno</option>
                                </select>
                            </div>
                        </div>
                        {this.state.laboratorio ?
                            <div className="row z-depth-1 center-align" id="agenda">

                                <div className="blue lighten-4 center-align" id="cabecalho">
                                    <h1>{this.state.laboratorio.nome_ambiente}</h1>
                                    <h1>{this.converterMes(String(this.state.mesSelecionado))}/{this.state.ano} - {this.state.periodo}</h1>
                                </div>
                                {/* <TableAgenda renderLinha={this.renderRowsDia().bind(this)}/> */}

                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th id="1">Segunda-feira</th>
                                            <th id="2">Terça-feira</th>
                                            <th id="3">Quarta-feira</th>
                                            <th id="4">Quinta-feira</th>
                                            <th id="5">Sexta-feira</th>
                                            <th id="6">sábado</th>

                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(0, 6)}
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.handlerDiaAgendamento(0, 6, 0)
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => () => {
                                                    this.handlerDiaAgendamento(0, 6, 1)
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.handlerDiaAgendamento(0, 6, 2)
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.handlerDiaAgendamento(0, 6, 3)
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.handlerDiaAgendamento(0, 6, 4)
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.handlerDiaAgendamento(0, 6, 5)
                                                }} /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Segunda-feira</th>
                                            <th>Terça-feira</th>
                                            <th>Quarta-feira</th>
                                            <th>Quinta-feira</th>
                                            <th>Sexta-feira</th>
                                            <th>sábado</th>
                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(7, 13)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Segunda-feira</th>
                                            <th>Terça-feira</th>
                                            <th>Quarta-feira</th>
                                            <th>Quinta-feira</th>
                                            <th>Sexta-feira</th>
                                            <th>sábado</th>
                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(14, 20)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Segunda-feira</th>
                                            <th>Terça-feira</th>
                                            <th>Quarta-feira</th>
                                            <th>Quinta-feira</th>
                                            <th>Sexta-feira</th>
                                            <th>sábado</th>
                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(21, 27)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Segunda-feira</th>
                                            <th>Terça-feira</th>
                                            <th>Quarta-feira</th>
                                            <th>Quinta-feira</th>
                                            <th>Sexta-feira</th>
                                            <th>sábado</th>
                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(28, 34)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <table className="centered tableAgenda">
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Segunda-feira</th>
                                            <th>Terça-feira</th>
                                            <th>Quarta-feira</th>
                                            <th>Quinta-feira</th>
                                            <th>Sexta-feira</th>
                                            <th>sábado</th>
                                        </tr>
                                        <tr>
                                            <th>aula</th>
                                            {this.renderRowsDia().slice(34, 40)}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add'
                                                onClick={() => {
                                                    this.setState({
                                                        ...this.state,
                                                        horario_aula: '1',
                                                        dia_semana: 'segunda'
                                                    })
                                                }} /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>4</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                        <tr>
                                            <td>5</td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                            <td><Button class="btn-flat modal-trigger "
                                                href="#modal1" icone='add' /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            : ''}
                    </div>
                    {/* <div className="col s12 m4 l4">
                        <div className="row" id="botoesAgenda">
                            <a className="waves-effect waves-light btn-large" value="Laboratório 1" onClick={this.handlerLaboratorio}><span className="span">Laboratório 1</span></a>
                            <a className="waves-effect waves-light btn-large" value="Laboratório 2" onClick={this.handlerLaboratorio}>Laboratório 2</a>
                            <a className="waves-effect waves-light btn-large" value="Equipamentos Multimídia" onClick={this.handlerLaboratorio}>Equipamentos Multimídia</a>
                        </div>
                    </div> */}
                    <ModalAgenda item={this.props.state}
                        onClick={() => { this.handlerHorario() }} />
                </form>
            </div>
        )
    }
}
const mapStateToProps = store => ({ agendamento_ambiente: store.agendamentoAmbienteReducer.agendamento_ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Agendamento);