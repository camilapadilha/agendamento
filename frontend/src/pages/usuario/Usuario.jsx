import React, { Component } from 'react';
import M from 'materialize-css/dist/js/materialize.min.js';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './usuarioActions';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Select from '../../componentes/common/Select';
import Option from '../../componentes/common/Option';
import Button from '../../componentes/common/button';
import Table from '../../componentes/list/table';
import './usuario.css';
import Api from '../../Api';

class Usuario extends Component {
    constructor() {
        super();
        this.state = {
            dados: {
                nome: '',
                cpf: '',
                celular: '',
                email_pessoal: '',
                email_institucional: '',
                senha: '',
                funcao: '',
                listDisciplina: [],
            },
            confirmar_senha: '',
            disciplinaSelect: [],
            funcaoSelect: [],
            disciplina: ''
        }
        this.handleClick = this.handleClick.bind(this);
    }

    limparCampos() {
        this.setState({
            dados: {
                nome: '',
                login: '',
                cpf: '',
                celular: '',
                email_pessoal: '',
                email_institucional: '',
                senha: '',
                funcao: '',
                listDisciplina: [],
            },
            disciplina: '',
            funcaoSelect: [],
            confirmar_senha: '',

        });
    }
    async componentDidMount() {
        M.AutoInit();
        const funcaoSelect = await Api.buscarFuncao();
        this.setState({
            funcaoSelect: funcaoSelect.data.dados,
        })
    }

    async handleClick() {
        await Api.salvarUsuario(this.state.dados);
        this.limparCampos();
    }

    renderOptionsFuncao() {
        const funcaoSelect = this.state.funcaoSelect || [];
        let lista = [];

        lista = funcaoSelect.map((item, index) => (
            <option key={index + 1} value={item}>{item.nome}</option>)
        );
        lista.unshift(<option key="0" value="" disabled >Selecione uma opção</option>);

        return lista;
    }

    renderRowsDisciplinas() {
        const list = this.state.dados.listDisciplina || []
        return list.map(d => (
            <tr key={d.id_disciplina}>
                <td style={{ width: '80%' }}>{d.nome}</td>
                <td>
                    <Button class="btn" onClick={() =>
                        this.botaoExcluir(d)
                    }
                        icone="delete" />
                </td>
            </tr>
        ));
    }
    adicionarDisciplina() {
        let list = this.state.dados.listDisciplina || []
        list.push(this.state.disciplina);
        console.log("teste", list);
        this.setState({
            dados: {
                ...this.state.dados,
                listDisciplina: list,
            }
        })
    }

    render() {
        console.log("aaaaaaaaaaaa", this.renderOptionsFuncao());

        const { clickButtonEdit } = this.props;

        if (this.props.usuario.acao == 'edit') {
            this.setState({
                dados: {
                    id_usuario: this.props.usuario.value.id_usuario,
                    nome: this.props.usuario.value.nome,
                    cpf: this.props.usuario.value.cpf,
                    celular: this.props.usuario.value.celular,
                    emailPessoal: this.props.usuario.value.email_pessoal,
                    emailInstitucional: this.props.usuario.value.email_institucional,
                    funcao: this.props.usuario.value.funcao,
                    listDisciplina: this.props.usuario.value.listDisciplina,
                },
            });
            clickButtonEdit('', '');
        }

        return (
            <div className="row">
                {this.props.list ?
                    <div className="right-align" id="botaoAdd">
                        <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                    </div>
                    :
                    <div className="right-align" id="botaoCadastrar">
                        <a className="modal-trigger" href="#modal">Cadastre-se</a>
                    </div>
                }
                <div id="modal" className="modal modal-fixed-footer">
                    <div className="modal-content">

                        <h1>Cadastro de Usuário</h1>
                        <div id='painelDadosPessoais' className="row">
                            <h1>Dados Pessoais</h1>
                            <InputAndLabel
                                icone='account_circle' idAndFor='nome'
                                type='text' label='Nome Completo'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        nome: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome} />

                            <InputAndLabel
                                icone='credit_card' idAndFor='cpf'
                                type='text' label='CPF'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        cpf: event.target.value
                                    }
                                })}
                                value={this.state.dados.cpf} />
                            <InputAndLabel
                                icone='phone' idAndFor='celular'
                                type='text' label='Celular'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        celular: event.target.value
                                    }
                                })}
                                value={this.state.dados.celular} />

                            <div>
                                <InputAndLabel
                                    icone='contact_mail' idAndFor='emailPessoal'
                                    type='text' label='Email Pessoal'
                                    typeInput='input-field col m4'
                                    onChange={event => this.setState({
                                        dados: {
                                            ...this.state.dados,
                                            email_pessoal: event.target.value
                                        }
                                    })}
                                    value={this.state.dados.email_pessoal} />

                                <Select label='Selecione sua Função'
                                    value={this.state.dados.funcao}
                                    onChange={e => this.setState({
                                        dados: {
                                            ...this.state.dados,
                                            funcao: e.target.value
                                        }
                                    })}>
                                    {this.renderOptionsFuncao()}
                                </Select>
                            </div>
                        </div>
                        <div id="panelDisciplinas" className="row">
                            <div className="col-md">
                                <div className="row">
                                    <Select label='Selecione suas disciplinas'
                                        value={this.state.disciplina}
                                        onChange={e => this.setState({
                                            disciplina: e.target.value
                                        })}>
                                        <Option value='Matemática' name='Matemática' />
                                        <Option value='Português' name='Português' />
                                    </Select>
                                    <Button class='waves-effect waves-light btn botaoAdd'
                                        classIcon='right'
                                        icone='add' name='Adicionar'
                                        onClick={() => this.adicionarDisciplina()
                                        } />
                                </div>
                                <div className="row">
                                    <h1>Disciplinas</h1>
                                    <table className="responsive-table highlight" id="tableDisciplinas">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Ações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderRowsDisciplinas()}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div id='painelDadosAcesso' className="row">
                            <h1>Dados de Acesso</h1>

                            <InputAndLabel
                                icone='mail_outline' idAndFor='emailInstitucional'
                                type='text' label='Email Institucional'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        email_institucional: event.target.value
                                    }
                                })}
                                value={this.state.dados.email_institucional} />
                            <InputAndLabel
                                icone='lock_outline' idAndFor='senha'
                                type='password' label='Senha'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        senha: event.target.value
                                    }
                                })}
                                value={this.state.dados.senha} />
                            <InputAndLabel
                                icone='lock_outline' idAndFor='confirmarSenha'
                                type='password' label='Confirmar Senha'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    ...this.state,
                                    confirmar_senha: event.target.value
                                })}
                                value={this.state.confirmar_senha} />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.limparCampos()} />
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='send' name='Cadastrar'
                                onClick={() => this.handleClick()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = store => ({
    usuario: store.usuarioReducer.usuario
})
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Usuario)