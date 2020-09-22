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
                id_pessoa: '',
                nome_pessoa: '',
                login: '',
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
            disciplina: '',
            cloneListDisciplinaInicial: []
        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        const funcaoSelect = await Api.buscarFuncao();
        const disciplinaSelect = await Api.buscarDisciplina();

        this.setState({
            funcaoSelect: funcaoSelect.data.dados,
        })
        this.setState({
            disciplinaSelect: disciplinaSelect.data.dados,
        })

        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function () {
            var elems = document.querySelectorAll('select');
            var options = document.querySelectorAll('option');
            M.FormSelect.init(elems, options);
        });

    }

    limparCampos() {
        this.setState({
            dados: {
                id_pessoa: '',
                nome_pessoa: '',
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
            disciplinaSelect: [],
            confirmar_senha: '',

        });
        this.limparInicializacaoForms();
    }

    inicializarForms() {
        document.getElementById('label_nome').setAttribute('class', 'active');
        document.getElementById('label_cpf').setAttribute('class', 'active');
        document.getElementById('label_cel').setAttribute('class', 'active');
        document.getElementById('label_emailPessoal').setAttribute('class', 'active');
        document.getElementById('label_emailInstitucional').setAttribute('class', 'active');
    }

    limparInicializacaoForms() {
        document.getElementById('label_nome').setAttribute('class', '');
        document.getElementById('label_cpf').setAttribute('class', '');
        document.getElementById('label_cel').setAttribute('class', '');
        document.getElementById('label_emailPessoal').setAttribute('class', '');
        document.getElementById('label_emailInstitucional').setAttribute('class', '');
    }

    limparValidacoes() {
        document.getElementById('validar_nome').innerText = '';
        document.getElementById('validar_cpf').innerText = '';
        document.getElementById('validar_celular').innerText = '';
        document.getElementById('validar_email_pessoal').innerText = '';
        document.getElementById('validar_email_institucional').innerText = '';
        document.getElementById('validar_senha').innerText = '';
        document.getElementById('validar_confirmar_senha').innerText = '';
        document.getElementById('validar_senhas').innerText = '';
    }

    btnCancelar() {
        this.limparCampos();
        this.limparValidacoes();
        this.limparInicializacaoForms();
    }

    validarEmail(email) {
        let usuario = email.substring(0, email.indexOf("@"));
        let dominio = email.substring(email.indexOf("@") + 1, email.length);
        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") == -1) &&
            (dominio.search("@") == -1) &&
            (usuario.search(" ") == -1) &&
            (dominio.search(" ") == -1) &&
            (dominio.search(".") != -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            return true;
        } else {
            return false;
        }
    }

    validarEmailInstitucional(value) {
        let indice = value.indexOf('@') + 1;
        let email = value.slice(indice);

        if (this.validarEmail(value)) {
            if (email != 'escola.pr.gov.br') {
                return false;
            } else {
                return true;
            }
        }
    }
    async handleClick() {
        let listDisciplinasExcluidas = [];
        let clone = this.state.cloneListDisciplinaInicial;
        let listDisciplina = this.state.dados.listDisciplina;
        let pode_salvar = true;
        this.limparValidacoes();
        if (this.state.dados.nome_pessoa == '') {
            pode_salvar = false;
            document.getElementById('validar_nome').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.cpf == '') {
            pode_salvar = false;
            document.getElementById('validar_cpf').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.celular == '') {
            pode_salvar = false;
            document.getElementById('validar_celular').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.email_pessoal == '') {
            pode_salvar = false;
            document.getElementById('validar_email_pessoal').innerText = 'Campo Obrigattório.';
        } else if (!this.validarEmail(this.state.dados.email_pessoal)) {
            document.getElementById('validar_email_pessoal').innerText = 'Email Inválido';
        }
        if (this.state.dados.email_institucional == '') {
            pode_salvar = false;
            document.getElementById('validar_email_institucional').innerText = 'Campo Obrigattório.';
        } else if (!this.validarEmailInstitucional(this.state.dados.email_institucional)) {
            document.getElementById('validar_email_institucional').innerText = 'Email Inválido';
        }
        if (this.state.dados.senha == '') {
            pode_salvar = false;
            document.getElementById('validar_senha').innerText = 'Campo Obrigattório.';
        }
        if (this.state.confirmar_senha == '') {
            pode_salvar = false;
            document.getElementById('validar_confirmar_senha').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.funcao == '') {
            pode_salvar = false;
            document.getElementById('validar_funcao').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.senha != '' && this.state.confirmar_senha != '') {
            if (this.state.dados.senha != this.state.confirmar_senha) {
                pode_salvar = false;
                document.getElementById('validar_senhas').innerText = 'As senhas tem que ser iguais.';
            }
        }

        clone.filter(function (element) {
            if (listDisciplina.indexOf(element) === -1) {   // se não for encontrado um valor nos dois arrays
                listDisciplinasExcluidas.push(element)
            }
        });


        if (pode_salvar) {
            var elem = document.getElementById('modal');
            var instance = M.Modal.getInstance(elem);
            await Api.salvarUsuario(this.state.dados, listDisciplinasExcluidas);
            instance.close();
            this.limparValidacoes();
            this.limparCampos();
        }
    }

    renderOptionsFuncao() {
        const funcaoSelect = this.state.funcaoSelect || [];
        let lista = [];
        lista = funcaoSelect.map((item, index) => (
            <option key={index + 1} value={item.id_funcao}>{item.nome_funcao}</option>)
        );

        lista.unshift(<option key="0" value='' disabled selected>Selecione uma opção</option>);
        return lista;
    }

    renderOptionsDisciplina() {
        const disciplinaSelect = this.state.disciplinaSelect || [];

        let lista = [];
        lista = disciplinaSelect.map((item, index) => (
            <option key={index + 1} value={index}>{item.nome_disciplina}</option>)
        );

        lista.unshift(<option key="0" value='' disabled>Selecione uma opção</option>);
        return lista;
    }

    renderRowsDisciplinas() {
        const list = this.state.dados.listDisciplina || [];

        return list.map(d => (
            <tr key={d.id_disciplina}>
                <td style={{ width: '80%' }}>{d.nome_disciplina}</td>
                <td>
                    <Button class="btn" onClick={() =>
                        this.removerDisciplina(d)
                    }
                        icone="delete" />
                </td>
            </tr>
        ));
    }

    adicionarDisciplina() {
        let list = this.state.dados.listDisciplina || []
        list.push(this.state.disciplina);
        this.setState({
            dados: {
                ...this.state.dados,
                listDisciplina: list,
            }
        })
    }

    removerDisciplina(d) {
        let list = this.state.dados.listDisciplina;
        let indice = list.indexOf(d, 0)

        list.splice(indice, 1);
        this.setState({
            ...this.dados,
            listDisciplina: list
        })
    }

    async buscarDisciplinasPessoa(id_pessoa) {
        const list = await Api.buscarDisciplinasPessoa(id_pessoa);

        this.setState({
            dados: {
                ...this.state.dados,
                listDisciplina: list.data.dados,
            },
        })
        let clone = Object.assign([], this.state.dados.listDisciplina);
        console.log("clone", clone);
        this.setState({
            cloneListDisciplinaInicial: clone
        })
    }

    render() {
        const { clickButtonEdit } = this.props;

        if (this.props.usuario.acao == 'edit') {
            this.buscarDisciplinasPessoa(this.props.usuario.value.id_pessoa);

            var elem = document.getElementById('funcoes');
            var instance = M.FormSelect.getInstance(elem);
            console.log("instance", instance);

            if (instance) {
                console.log("entrou");
                instance.destroy();
            }

            this.setState({
                dados: {
                    ...this.state.dados,
                    id_usuario: this.props.usuario.value.id_usuario,
                    id_pessoa: this.props.usuario.value.id_pessoa,
                    nome_pessoa: this.props.usuario.value.nome_pessoa,
                    cpf: this.props.usuario.value.cpf,
                    celular: this.props.usuario.value.celular,
                    email_pessoal: this.props.usuario.value.email_pessoal,
                    email_institucional: this.props.usuario.value.email_institucional,
                    funcao: this.props.usuario.value.id_funcao
                },
            });

            // document.getElementById('funcoes').getElementsByTagName('option')[2].setAttribute("selected", true);

            var elems = document.getElementById('funcoes');
            var options = document.getElementById('funcoes').getElementsByTagName('option');

            M.FormSelect.init(elems, options);
            this.inicializarForms();
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
                        <div id='painelDadosPessoais' className="row validate">
                            <h1>Dados Pessoais</h1>
                            <InputAndLabel
                                icone='account_circle' idAndFor='nome'
                                type='text' label='Nome Completo'
                                typeInput='input-field col s4 m4 l4'
                                idLabel='label_nome'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        nome_pessoa: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome_pessoa}
                                idSpam='validar_nome' />

                            <InputAndLabel
                                icone='credit_card' idAndFor='cpf'
                                type='text' label='CPF'
                                typeInput='input-field col s4 m4 l4'
                                idLabel='label_cpf'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        cpf: event.target.value
                                    }
                                })}
                                value={this.state.dados.cpf}
                                idSpam='validar_cpf' />
                            <InputAndLabel
                                icone='phone' idAndFor='celular'
                                type='text' label='Celular'
                                typeInput='input-field col s4 m4 l4'
                                idLabel='label_cel'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        celular: event.target.value
                                    }
                                })}
                                value={this.state.dados.celular}
                                idSpam='validar_celular' />

                            <div className='linha_2'>
                                <InputAndLabel
                                    icone='contact_mail' idAndFor='emailPessoal'
                                    type='text' label='Email Pessoal'
                                    typeInput='input-field col s4 m4 l4'
                                    idLabel='label_emailPessoal'
                                    onChange={event => this.setState({
                                        dados: {
                                            ...this.state.dados,
                                            email_pessoal: event.target.value
                                        }
                                    })}
                                    value={this.state.dados.email_pessoal}
                                    idSpam='validar_email_pessoal' />
                                <div className="input-field col s4 m4 l4">
                                    <Select id="funcoes"
                                        label='Selecione sua Função'
                                        value={this.state.dados.funcao}
                                        onChange={e =>
                                            this.setState({
                                                dados: {
                                                    ...this.state.dados,
                                                    funcao: e.target.value
                                                }
                                            })
                                        }
                                        idSpam='validar_funcao' >
                                        {this.renderOptionsFuncao()}
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div id="panelDisciplinas" className="row">
                            <div className="col s12 m12 l12">
                                <div className="row">
                                    <div className="input-field col s4 m4 l4">
                                        <Select
                                            id='disciplinas'
                                            label='Selecione suas disciplinas'
                                            value={this.state.disciplina}
                                            onChange={e => this.setState({
                                                disciplina: this.state.disciplinaSelect[e.target.value]
                                            })}>
                                            {this.renderOptionsDisciplina()}
                                        </Select>
                                    </div>
                                    <Button class='waves-effect waves-light btn botaoAdd'
                                        classIcon='right'
                                        icone='add' name='Adicionar'
                                        onClick={() => this.adicionarDisciplina()} />
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
                            <span style={{ color: 'red' }} className="right" id='validar_senhas'></span>
                            <h1>Dados de Acesso</h1>

                            <InputAndLabel
                                icone='mail_outline' idAndFor='emailInstitucional'
                                type='text' label='Email Institucional'
                                typeInput='input-field col s4 m4 l4'
                                idLabel='label_emailInstitucional'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        email_institucional: event.target.value
                                    }
                                })}
                                value={this.state.dados.email_institucional}
                                idSpam='validar_email_institucional' />
                            <InputAndLabel
                                icone='lock_outline' idAndFor='senha'
                                type='password' label='Senha'
                                typeInput='input-field col s4 m4 l4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        senha: event.target.value
                                    }
                                })}
                                value={this.state.dados.senha}
                                idSpam='validar_senha' />
                            <InputAndLabel
                                icone='lock_outline' idAndFor='confirmarSenha'
                                type='password' label='Confirmar Senha'
                                typeInput='input-field col s4 m4 l4'
                                onChange={event => this.setState({
                                    ...this.state,
                                    confirmar_senha: event.target.value
                                })}
                                value={this.state.confirmar_senha}
                                idSpam='validar_confirmar_senha' />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.btnCancelar()} />
                            <Button class='waves-effect waves-light btn '
                                classIcon='right'
                                icone='send' name='Cadastrar'
                                onClick={() => this.handleClick()}
                                type='button' />
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