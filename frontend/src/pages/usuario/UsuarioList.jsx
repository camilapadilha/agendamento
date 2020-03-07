import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Usuario from './Usuario';
import Table from '../../componentes/list/table';
import Button from '../../componentes/common/button';

import { clickButtonEdit } from './usuarioActions';

import Api from '../../Api';

import Pagination from '../../componentes/list/pagination';

class UsuarioList extends Component {
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
                <td style={{ width: '80%' }}>{u.nome}</td>
                <td style={{ width: '20%' }}>
                    <Button class="btn modal-trigger" href="#modal"
                        onClick={() =>
                            clickButtonEdit(u, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn" onClick={() =>
                        this.botaoExcluir(u)
                    }
                        icone="delete" />
                </td>
            </tr>
        ));

    }
   
    render() {
        const paginate = pageNumber => this.setState({ currentPage: pageNumber });

        return (
            <Table id="tableList" titulo="Listagem de Usuario"
                headers={(
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>CPF</th>
                        <th>E-mail Institucional</th>
                        <th>Ações</th>
                    </tr>
                )}
                modal={(<Usuario list="true" />)}>
                {this.renderRows()}
                <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.list.length}
                    paginate={paginate}
                />
            </Table>
        )
    }
}

const mapStateToProps = store => ({ usuario: store.usuarioReducer.usuario });
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UsuarioList);