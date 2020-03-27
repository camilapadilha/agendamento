import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from './funcaoActions';

import Funcao from './Funcao';
import Table from '../../componentes/list/table';
import Button from '../../componentes/common/button';

import Api from '../../Api';
import ModalConfirmacao from '../../componentes/common/modalConfirmacao';

import Pagination from '../../componentes/list/pagination';

class FuncaoList extends Component {
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
        const funcoes = await Api.buscarFuncao();
        this.setState({
            list: funcoes.data.dados,
        });
    }

    async componentDidUpdate() {
        const funcoes = await Api.buscarFuncao();
        this.setState({
            list: funcoes.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluirFuncao(obj);
    }

    renderRows() {
        const list = this.state.list || []
        const { clickButtonEdit, funcao } = this.props;

        // Get current posts
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);

        return currentPosts.map(f => (
            <tr key={f.id_funcao}>
                <td style={{ width: '87%' }}>{f.nome}</td>
                <td style={{ width: '13%' }}>
                    <Button class="btn modal-trigger btn-icon " href="#modal"
                        onClick={() =>
                            clickButtonEdit(f, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn modal-trigger btn-icon "
                        href="#modal1"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                item: f
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
                <Table id="tableList" id_h1="titleTable" titulo="Listagem de Função"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th id="th_acoes">Ações</th>
                        </tr>
                    )}
                    modal={(<Funcao />)}>
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
const mapStateToProps = store => ({ funcao: store.funcaoReducer.funcao })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(FuncaoList)