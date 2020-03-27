import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './ambienteActions';
import Ambiente from './Ambiente';
import Table from '../../componentes/list/table';
import Api from '../../Api';
import Button from '../../componentes/common/button';
import ModalConfirmacao from '../../componentes/common/modalConfirmacao';
import Pagination from '../../componentes/list/pagination';
import M from 'materialize-css/dist/js/materialize.min.js';

class AmbienteList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            current: 3,
            currentPage: 1,
            postsPerPage: 10,
            item: null
        }
    }

    async componentWillMount() {
        const ambientes = await Api.buscarAmbiente();
        this.setState({
            list: ambientes.data.dados,
        });

    }

    componentDidMount() {
        M.AutoInit();
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
                <td style={{ width: '31%' }}>{a.nome}</td>
                <td style={{ width: '14%' }}>{a.num_sala}</td>
                <td style={{ width: '14%' }}>{a.capacidade_publico}</td>
                <td style={{ width: '14%' }}>{a.quantidade_computadores}</td>
                <td style={{ width: '14%' }}>{a.possui_internet == 1 ? 'Sim' : 'Não'}</td>
                <td style={{ width: '13%' }}>
                    <Button class="btn modal-trigger btn-icon " href="#modal"
                        onClick={() =>
                            clickButtonEdit(a, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn modal-trigger btn-icon "
                        href="#modal1"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                item: a
                            })
                        }
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
                <Table id="tableList" id_h1="titleTable" titulo="Listagem de Ambientes"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th>Número</th>
                            <th>Capacidade de Público</th>
                            <th>Quantidade Computadores</th>
                            <th>Possui Internet</th>
                            <th id="th_acoes">Ações</th>
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
                <ModalConfirmacao
                    item={this.state.item ? this.state.item.nome : null}
                    onClick={() => {
                        this.botaoExcluir(this.state.item)
                    }
                    } />
            </>
        )
    }
}
const mapStateToProps = store => ({ ambiente: store.ambienteReducer.ambiente })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AmbienteList)