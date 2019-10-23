import React, { Component } from 'react';

import Equipamento from './Equipamento';
import Table from '../../componentes/list/table';
import Th from '../../componentes/list/th';
import Tr from '../../componentes/list/tr';
import Td from '../../componentes/list/td';


export default class EquipamentoList extends Component {
    render() {
        return (
            <>
                <Table titulo="Listagem de Equipamentos Multimídia"
                    headers={(
                        <tr>
                            <Th cabecalho="Teste 1" />
                            <Th cabecalho="Teste 2" />
                            <Th cabecalho="Teste 3" />
                        </tr>

                    )}
                    modal={(<Equipamento />)}
                >
                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                    </Tr>

                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                    </Tr>

                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                    </Tr>
                    
                </Table>

            </>

        )
    }
}