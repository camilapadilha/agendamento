import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

// import Select from '../../componentes/common/Select';
// import Option from '../../componentes/common/Option';
import M from 'materialize-css';

import './agendamento.css';

export default class Agendamento extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            mesSelecionado: new Date().getMonth(),
            ano: new Date().getFullYear()
        };
        this.handlerMonth = this.handlerMonth.bind(this);
    }
    componentDidMount() {
        M.AutoInit();
    }

    handlerMonth(event) {
        this.setState({ mesSelecionado: event.target.mesSelecionado });
    }
    renderRowsDia() {       
        var mes = Number(this.state.mesSelecionado);
        var anoAtual = new Date().getFullYear();
        var quantDiasNoMes = new Date(anoAtual, mes+1, 0).getDate();
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
            }
            else {
                rows.push(<th>__</th>);
            }

        } while (x != diaIniciaMes)

        return rows
    }
    // renderRowsDiasSemana() {

    // }
    render() {

        return (
            <div className="row">
                <form>
                    <div className="col s12 m8 l8">
                        <div className="row" id="filtros">
                            <div className="col m2">
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
                            <div className="col m2">
                                <label>Período</label>
                                <select className="input-field">
                                    <option value="" disabled selected>Escolha o período</option>
                                    <option value="1">Matutino</option>
                                    <option value="2">Vespertino</option>
                                    <option value="3">noturno</option>
                                </select>
                            </div>
                        </div>
                        <div className="row z-depth-1" id="agenda">

                            <div className="blue lighten-4 center-align" id="cabecalho">
                                <h1>Laboratório 1</h1>
                                <h1>Novembro/{this.state.ano} Matutino</h1>
                            </div>

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
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
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
                                        {this.renderRowsDia().slice(28,34)}
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>1</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>

                    </div>
                    <div className="col s12 m4 l4">
                        <div className="row" id="botoesAgenda">
                            <a className="waves-effect waves-light btn-large"><span className="span">Laboratório 1</span></a>
                            <a className="waves-effect waves-light btn-large">Laboratório 2</a>
                            <a className="waves-effect waves-light btn-large">Equipamentos Multimídia</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
Agendamento = reduxForm({ form: 'Agendamento' })(Agendamento)