import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from '../agendamento/agendamento_ambientes/agendamento_ambienteActions';

import TableAgenda from '../../componentes/common/TableAgenda';
import ModalAgenda from '../../componentes/common/modalAgendamento';
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
            usuario: '',
            horarios: []
        };
        this.handlerMonth = this.handlerMonth.bind(this);
        this.handlerPeriodo = this.handlerPeriodo.bind(this);
        this.handlerLaboratorio = this.handlerLaboratorio.bind(this);
        this.buscarHorario = this.buscarHorario.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
        this.buscarHorario();
        if (this.props.agendamento_ambiente.value) {
            this.setState({
                ...this.state,
                mesSelecionado: this.props.agendamento_ambiente.value.mesSelecionado,
                periodo: this.props.agendamento_ambiente.value.periodo,
                laboratorio: this.props.agendamento_ambiente.value.ambiente,
            });

        }
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

        var count;
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
        if (rows.length > 25 && rows.length <= 33) {
            for (count = rows.length; count <= 33; count++) {
                rows.push(<th>__</th>);
            }
        } else if (rows.length >= 35) {
            for (count = rows.length; count <= 40; count++) {
                rows.push(<th>__</th>);
            }
        }
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
        Api.salvarHorarioAmbiente(this.state);
    }

    async buscarHorario() {
        var result = await Api.buscarHorariosAmbiente();
        this.setState({
            ...this.state,
            horarios: result.data.dados
        });
        console.log("dados", result.data.dados);
    }

    handlerDiaAgendamento(init, end, c) {
        const listaDias = this.renderRowsDia().slice(init, end);
        // const dia = "0" + listaDias[c].props.children[1] + '-' + '0' + this.state.mesSelecionado + '-' + this.state.ano;
        const dia = this.state.ano + '-' + "0" + this.state.mesSelecionado + '-' + '0' + listaDias[c].props.children[1];
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
                            <a className="waves-light " href='/app/agendamento_ambiente'> <i className="material-icons small">arrow_back</i></a>
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
                                <TableAgenda renderLinha={this.renderRowsDia().slice(0, 6)}
                                    horariosAgendados={this.state.horarios}/>
                                <TableAgenda renderLinha={this.renderRowsDia().slice(7, 13)}
                                    horariosAgendados={this.state.horarios} />
                                <TableAgenda renderLinha={this.renderRowsDia().slice(14, 20)}
                                    horariosAgendados={this.state.horarios} />
                                <TableAgenda renderLinha={this.renderRowsDia().slice(21, 27)}
                                    horariosAgendados={this.state.horarios} />
                                <TableAgenda renderLinha={this.renderRowsDia().slice(28, 34)}
                                    horariosAgendados={this.state.horarios} />
                                {this.renderRowsDia().length > 34 ? <TableAgenda renderLinha={this.renderRowsDia().slice(34, 40)}
                                    horariosAgendados={this.state.horarios} /> : ''}
                            </div>
                            : ''}
                    </div>

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