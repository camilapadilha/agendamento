import React, { Component } from 'react'
import Button from '../../componentes/common/button';

export default class Tbody extends Component {
    renderLinhas(coluna) {
        var linhas = [];
        var horarios = this.props.horariosAgendados;
        for (let l = 1; l <= 7; l++) {
            if (l == 1) {
                linhas.push(<td>{coluna}</td>);
            }
            else {
                for(const t of this.props.linhas){
                    console.log(t.props.children[1]);
                }
                for (const d of horarios) {
                    var dia = d.data_agendamento.slice(8, 10);
                    
                    if (1 == 1) {

                    } else {
                        linhas.push(<td><Button class="btn-flat modal-trigger "
                            href="#modal1" icone='add' /></td>);
                    }
                }
            }
        }
        return linhas;
    }

    renderColumns() {
        var colunas = [];
        for (let c = 1; c <= 5; c++) {
            colunas.push(<tr>{this.renderLinhas(c)}</tr>);
        }
        return colunas;
    }

    render() {
        return (
            <tbody> {this.renderColumns()} </tbody>
        )

    }

}