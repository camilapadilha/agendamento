import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from './funcaoActions';

import Funcao from './Funcao';
import Table from '../../componentes/list/table';
import Button from '../../componentes/common/button';

import Api from '../../Api';

class FuncaoList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            obj: {},
        }
    }

    async componentWillMount() {
        const funcoes = await Api.buscar();
        this.setState({
            list: funcoes.data.dados,
            acao: 'listar'
        });
    }

    async componentDidUpdate() {
        const funcoes = await Api.buscar();
        this.setState({
            list: funcoes.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluir(obj);
    }

    renderRows() {
        const list = this.state.list || []
        const { clickButtonEdit, funcao } = this.props;

        return list.map(f => (
            <tr key={f.id_funcao}>
                <td style={{ width: '80%' }}>{f.nome}</td>
                <td style={{ width: '20%' }}>
                    <Button class="btn modal-trigger" href="#modal"
                        onClick={() =>
                            clickButtonEdit(f, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn" onClick={() =>
                        this.botaoExcluir(f)
                    }
                        icone="delete" />
                </td>
            </tr>
        ));
    }

    render() {
        return (
            <Table titulo="Listagem de Função"
                header={(
                    <tr>
                        <th>Nome</th>
                        <th>Ações</th>
                    </tr>
                )}
                modal={(<Funcao />)}>
                {this.renderRows()}
            </Table>
        )
    }
}
const mapStateToProps = store => ({ funcao: store.funcaoReducer.funcao })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FuncaoList)