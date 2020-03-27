import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Disciplina from './Disciplina';
import Table from '../../componentes/list/table';
import Button from '../../componentes/common/button';

import { clickButtonEdit } from './disciplinaActions';

import Api from '../../Api';
import ModalConfirmacao from '../../componentes/common/modalConfirmacao';

import Pagination from '../../componentes/list/pagination';

class DisciplinaList extends Component {
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
        const disciplina = await Api.buscarDisciplina();
        this.setState({
            list: disciplina.data.dados,
            acao: 'listar'
        });
    }

    async componentDidUpdate() {
        const disciplina = await Api.buscarDisciplina();
        this.setState({
            list: disciplina.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluirDisciplina(obj);
    }
    renderRows() {
        const { clickButtonEdit } = this.props;
        // Get current posts
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);

        return currentPosts.map(d => (
            <tr key={d.id_disciplina}>
                <td style={{ width: '87%' }}>{d.nome}</td>
                <td style={{ width: '13%' }}>
                    <Button class="btn modal-trigger btn-icon " href="#modal"
                        onClick={() =>
                            clickButtonEdit(d, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn modal-trigger btn-icon "
                        href="#modal1"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                item: d
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
            <Table id="tableList" id_h1="titleTable" titulo="Listagem de Disciplina"
                header={(
                    <tr>
                        <th>Nome</th>
                        <th id="th_acoes">Ações</th>
                    </tr>
                )}
                modal={(<Disciplina />)}>
                {this.renderRows()}
                <Pagination
                    postsPerPage={this.state.postsPerPage}
                    totalPosts={this.state.list.length}
                    paginate={paginate}
                />
                <ModalConfirmacao
                    item={this.state.item ? this.state.item.nome : null}
                    onClick={() => {
                        this.botaoExcluir(this.state.item)
                    }
                    } />
            </Table>
        )
    }
}

const mapStateToProps = store => ({ disciplina: store.disciplinaReducer.disciplina });
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(DisciplinaList);