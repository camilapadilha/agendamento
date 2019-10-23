import React, { Component } from 'react';

import Disciplina from './Disciplina';
import Table from '../../componentes/list/table';
import Th from '../../componentes/list/th';
import Tr from '../../componentes/list/tr';
import Td from '../../componentes/list/td';

export default class DisciplinaList extends Component {
    render() {
        return (
            <Table titulo="Listagem de Função"
            headers={(
                <Th cabecalho="Nome"/>
            )}
            modal={(<Disciplina/>)}
            >
                <Tr>
                    <Td linha="Português"/>
                </Tr>
                <Tr>
                    <Td linha="Matemática"/>
                </Tr>
            </Table>
        )
    }
}