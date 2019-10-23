import React, { Component } from 'react';

import Funcao from './Funcao';
import Table from '../../componentes/list/table';
import Th from '../../componentes/list/th';
import Tr from '../../componentes/list/tr';
import Td from '../../componentes/list/td';

export default class FuncaoList extends Component {
    render() {
        return (
            <Table titulo="Listagem de Função"
            headers={(
                <Th cabecalho="Nome"/>
            )}
            modal={(<Funcao/>)}
            >
                <Tr>
                    <Td linha="Professor"/>
                </Tr>
                <Tr>
                    <Td linha="Agente Educacional"/>
                </Tr>
            </Table>
        )
    }
}