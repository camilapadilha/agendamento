import React, { Component } from 'react';

import Ambiente from './Ambiente';
import Table from '../../componentes/list/table';
import Th from '../../componentes/list/th';
import Tr from '../../componentes/list/tr';
import Td from '../../componentes/list/td';


export default class AmbienteList extends Component {
    render() {
        return (
            <>
                <Table titulo="Listagem de Ambientes"
                    headers={(
                        <tr>
                            <Th cabecalho="Nome" />
                            <Th cabecalho="Numero de Sala" />
                            <Th cabecalho="Capacidade de Publico" />
                            <Th cabecalho="Quantidade de Computadores" />
                            <Th cabecalho="Possui Internet" />
                        </tr>

                    )}
                    modal={(<Ambiente />)}
                >
                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                    </Tr>

                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                    </Tr>

                    <Tr>
                        <Td linha="oi" />
                        <Td linha="oii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                        <Td linha="oiii" />
                    </Tr>
                    
                </Table>

            </>

        )
    }
}