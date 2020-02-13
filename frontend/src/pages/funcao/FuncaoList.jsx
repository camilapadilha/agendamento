import React, { Component } from 'react';

import Funcao from './Funcao';
import Table from '../../componentes/list/table';
import Th from '../../componentes/list/th';

import Api from '../../Api';

export default class FuncaoList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
        }
    }
    async componentWillMount() {
        const funcoes = await Api.buscar();
        this.setState({
            list: funcoes.data.dados,
        });
    }

    renderRows() {
        const list = this.state.list || []
        
        return list.map(f => (
            <tr key={f.id_funcao}>
                <td>{f.nome}</td>
            </tr>
        ));
    }
    render() {
        return (
            <Table titulo="Listagem de Função"
                headers={(
                    <Th cabecalho="Nome" />
                )}
                modal={(<Funcao />)}
            >
                {this.renderRows()}
            </Table>
        )
    }
}