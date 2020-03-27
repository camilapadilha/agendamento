import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Usuario from './Usuario';
import Table from '../../componentes/list/table';
import Button from '../../componentes/common/button';

import { clickButtonEdit } from './usuarioActions';

import Api from '../../Api';
import ModalConfirmacao from '../../componentes/common/modalConfirmacao';

import Pagination from '../../componentes/list/pagination';

class UsuarioList extends Component {
    constructor() {
        super();
        this.state = {
            list: [],
            current: 3,
            currentPage: 1,
            postsPerPage: 10,
            item: ''
        }
    }

    async componentWillMount() {
        const usuario = await Api.buscarUsuario();
        this.setState({
            list: usuario.data.dados,
            acao: 'listar'
        });
    }

    async componentDidUpdate() {
        const usuario = await Api.buscarUsuario();
        this.setState({
            list: usuario.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluirUsuario(obj);
    }
    renderRows() {
        const { clickButtonEdit } = this.props;
        // Get current posts
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);

        return currentPosts.map(u => (
            <tr key={u.id_usuario}>
                <td style={{ width: '27%' }}>{u.nome}</td>
                <td style={{ width: '20%' }}>{u.login}</td>
                <td style={{ width: '15%' }}>{u.cpf}</td>
                <td style={{ width: '25%' }}>{u.email_institucional}</td>
                <td style={{ width: '13%' }}>
                    <Button class="btn modal-trigger btn-icon " href="#modal"
                        onClick={() =>
                            clickButtonEdit(u, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn modal-trigger btn-icon "
                        href="#modal1"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                item: u
                            })
                        }
                        }
                        icone="delete" />
                </td>
            </tr>
        ));

    }

    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });

        return (
            <>
                <Table id="tableList" id_h1="titleTable" titulo="Listagem de Usuario"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th>Login</th>
                            <th>CPF</th>
                            <th>E-mail Institucional</th>
                            <th id="th_acoes">Ações</th>
                        </tr>
                    )}
                    modal={(<Usuario list="true" />)} pagination={<Pagination
                        postsPerPage={this.state.postsPerPage}
                        totalPosts={this.state.list.length}
                        paginate={paginate}
                    />}>
                    {this.renderRows()}

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

const mapStateToProps = store => ({ usuario: store.usuarioReducer.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UsuarioList);