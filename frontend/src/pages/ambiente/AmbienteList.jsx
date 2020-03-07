import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './ambienteActions';
import Ambiente from './Ambiente';
import Table from '../../componentes/list/table';
import Api from '../../Api';
import Button from '../../componentes/common/button';
import Pagination from '../../componentes/list/pagination';

class AmbienteList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            current: 3,
            currentPage: 1,
            postsPerPage: 10,
        }
    }

    async componentWillMount() {
        const ambientes = await Api.buscarAmbiente();
        this.setState({
            list: ambientes.data.dados,
        });

    }

    async componentDidUpdate() {
        const ambientes = await Api.buscarAmbiente();
        this.setState({
            list: ambientes.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluirAmbiente(obj);
    }

    renderRows() {
        const list = this.state.list || []
        const { clickButtonEdit, ambiente } = this.props;

        // Get current posts
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);

        return currentPosts.map(a => (
            <tr key={a.id_ambiente}>
                <td style={{ width: '16%' }}>{a.nome}</td>
                <td style={{ width: '16%' }}>{a.num_sala}</td>
                <td style={{ width: '16%' }}>{a.capacidade_publico}</td>
                <td style={{ width: '16%' }}>{a.quantidade_computadores}</td>
                <td style={{ width: '16%' }}>{a.possui_internet == 1 ? 'Sim' : 'Não'}</td>
                <td style={{ width: '20%' }}>
                    <Button class="btn modal-trigger" href="#modal"
                        onClick={() =>
                            clickButtonEdit(a, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn" onClick={() =>
                        this.botaoExcluir(a)
                    }
                        icone="delete" />
                </td>
            </tr>
        ));
    }

    render() {
        // Change page
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });

        return (
            <>
                <Table id="tableList" titulo="Listagem de Ambientes"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th>Número</th>
                            <th>Capacidade de Público</th>
                            <th>Quantidade Computadores</th>
                            <th>Possui Internet</th>
                            <th>Ações</th>
                        </tr>
                    )}
                    modal={(<Ambiente />)}>
                    {this.renderRows()}
                    <Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.state.list.length}
                        paginate={paginate}
                    />
                </Table>
            </>
        )
    }
}
const mapStateToProps = store => ({ ambiente: store.ambienteReducer.ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AmbienteList)