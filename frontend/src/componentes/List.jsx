import React, { Component } from 'react';

import Equipamento from '../pages/equipamento/Equipamento'

import './list.css';

export default class List extends Component {
    render() {
        return (
            <div className="row container z-depth-2">

                <div className="col m12">
                    <div className="row" id="tabela">
                        <h1>Listagem de Equipamentos Multimídia</h1>
                        <table class="responsive-table">
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Marca</th>
                                    <th>Modelo</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Equipamento 1</td>
                                    <td>teste 1</td>
                                    <td>teste 1</td>
                                </tr>
                                <tr>
                                    <td>Equipamento 1</td>
                                    <td>teste 1</td>
                                    <td>teste 1</td>
                                </tr>
                                <tr>
                                    <td>Equipamento 1</td>
                                    <td>teste 1</td>
                                    <td>teste 1</td>
                                </tr>
                                <tr>
                                    <td>Equipamento 1</td>
                                    <td>teste 1</td>
                                    <td>teste 1</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <Equipamento/>
                </div>
            </div>
            
        )
    }
}