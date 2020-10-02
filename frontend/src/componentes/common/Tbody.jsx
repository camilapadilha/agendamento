import React, { Component } from 'react'
import Button from '../../componentes/common/button';

export default class Tbody extends Component {
    renderLinhas(coluna) {
        var linhas = [];
        for (let l = 1; l <= 7; l++) {
            if (l == 1) {
                linhas.push(<td>{coluna}</td>);
            }
            else {
                linhas.push(<td><Button class="btn-flat modal-trigger "
                href="#modal1" icone='add' /></td>);
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