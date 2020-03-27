import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from './equipamentoActions';

import Button from '../../componentes/common/button';
import Equipamento from './Equipamento';
import Table from '../../componentes/list/table';
import Api from '../../Api';
import ModalConfirmacao from '../../componentes/common/modalConfirmacao';
import Pagination from '../../componentes/list/pagination';

class EquipamentoList extends Component {
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
        const equipamentos = await Api.buscarEquipamentos();
        this.setState({
            list: equipamentos.data.dados,
        });
    }

    async componentDidUpdate() {
        const equipamentos = await Api.buscarEquipamentos();
        this.setState({
            list: equipamentos.data.dados,
        });
    }
    async botaoExcluir(obj) {
        await Api.excluirEquipamentos(obj);
    }

    renderRows() {
        const list = this.state.list || []
        const { clickButtonEdit, equipamento } = this.props;

        // Get current posts
        const indexOfLastPost = this.state.currentPage * this.state.postsPerPage;
        const indexOfFirstPost = indexOfLastPost - this.state.postsPerPage;
        const currentPosts = this.state.list.slice(indexOfFirstPost, indexOfLastPost);

        return currentPosts.map(e => (
            <tr key={e.id_equipamento}>
                <td style={{ width: '30%' }}>{e.nome}</td>
                <td style={{ width: '29%' }}>{e.marca}</td>
                <td style={{ width: '28%' }}>{e.modelo}</td>
                <td style={{ width: '13%' }}>
                    <Button class="btn modal-trigger btn-icon " href="#modal"
                        onClick={() =>
                            clickButtonEdit(e, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn modal-trigger btn-icon "
                        href="#modal1"
                        onClick={() => {
                            this.setState({
                                ...this.state,
                                item: e
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
                <Table id="tableList" id_h1="titleTable" titulo="Listagem de Equipamentos"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th id="th_acoes">Ações</th>
                        </tr>
                    )}
                    modal={(<Equipamento />)}>
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
            </>

        )
    }
}

const mapStateToProps = store => ({ funcao: store.equipamentoReducer.equipamento });
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EquipamentoList);