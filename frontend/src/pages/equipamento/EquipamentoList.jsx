import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { clickButtonEdit } from './equipamentoActions';

import Button from '../../componentes/common/button';
import Equipamento from './Equipamento';
import Table from '../../componentes/list/table';
import Api from '../../Api';
import Pagination from '../../componentes/list/pagination';

class EquipamentoList extends Component {
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
                <td style={{ width: '26%' }}>{e.nome}</td>
                <td style={{ width: '26%' }}>{e.marca}</td>
                <td style={{ width: '26%' }}>{e.modelo}</td>
                <td style={{ width: '20%' }}>
                    <Button class="btn modal-trigger" href="#modal1"
                        onClick={() =>
                            clickButtonEdit(e, 'edit')
                        }
                        icone="edit" />
                    <Button class="btn" onClick={() =>
                        this.botaoExcluir(e)
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
                <Table id="tableList" titulo="Listagem de Equipamentos"
                    header={(
                        <tr>
                            <th>Nome</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                            <th>Ações</th>
                        </tr>
                    )}
                    modal={(<Equipamento />)}>
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

const mapStateToProps = store => ({ funcao: store.equipamentoReducer.equipamento });
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(EquipamentoList);