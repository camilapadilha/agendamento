import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './equipamentoActions';
import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';
import Api from '../../Api';

import './equipamento.css';

class Equipamento extends Component {
    constructor() {
        super();
        this.state = {
            dados: {
                id_equipamento: '',
                nome_equipamento: '',
                marca: '',
                modelo: '',
                descricao: '',
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    limparCampos() {
        this.setState({
            dados: {
                id_equipamento: '',
                nome_equipamento: '',
                marca: '',
                modelo: '',
                descricao: '',
            },
        });
    }

    inicializarForms() {
        document.getElementById('label_nome').setAttribute('class', 'active');
        document.getElementById('label_marca').setAttribute('class', 'active');
        document.getElementById('label_modelo').setAttribute('class', 'active');
        document.getElementById('label_descricao').setAttribute('class', 'active');
    }

    limparInicializacaoForms() {
        document.getElementById('label_nome').setAttribute('class', '');
        document.getElementById('label_marca').setAttribute('class', '');
        document.getElementById('label_modelo').setAttribute('class', '');
        document.getElementById('label_descricao').setAttribute('class', '');
    }

    limparValidacoes() {
        document.getElementById('validar_nome').innerText = '';
        document.getElementById('validar_marca').innerText = '';
        document.getElementById('validar_modelo').innerText = '';
        document.getElementById('validar_descricao').innerText = '';
    }

    btnCancelar() {
        this.limparCampos();
        this.limparValidacoes();
        this.limparInicializacaoForms();
    }

    async handleClick() {
        let pode_salvar = true;
        this.limparValidacoes();
        if (this.state.dados.nome_equipamento == '') {
            pode_salvar = false;
            document.getElementById('validar_nome').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.marca == '') {
            pode_salvar = false;
            document.getElementById('validar_marca').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.modelo == '') {
            pode_salvar = false;
            document.getElementById('validar_modelo').innerText = 'Campo Obrigattório.';
        }
        if (this.state.dados.descricao == '') {
            pode_salvar = false;
            document.getElementById('validar_descricao').innerText = 'Campo Obrigattório.';
        }
        if (pode_salvar) {
            var elem = document.getElementById('modal');
            var instance = M.Modal.getInstance(elem);
            await Api.salvarEquipamentos(this.state.dados);
            instance.close();
            this.limparValidacoes();
            this.limparCampos();
        }
    }
    render() {
        const { clickButtonEdit } = this.props;

        if (this.props.equipamento.acao == 'edit') {
            console.log("en", this.props.equipamento.value);

            this.setState({
                dados: {
                    id_equipamento: this.props.equipamento.value.id_equipamento,
                    nome_equipamento: this.props.equipamento.value.nome_equipamento,
                    modelo: this.props.equipamento.value.modelo,
                    marca: this.props.equipamento.value.marca,
                    descricao: this.props.equipamento.value.descricao,
                },
            });
            clickButtonEdit('', '');
            this.inicializarForms();
        }
        return (
            <div className="row">
                <div className="right-align" id="botaoAdd">
                    <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                </div>

                <div id="modal" className="modal modal-fixed-footer">
                    <div className="modal-content">
                        <form>
                            <h1>Cadastro de Equipamentos Multimídia</h1>
                            <InputAndLabel
                                icone='add_to_queue' idAndFor='nome'
                                type='text' label='Nome do Equipamento'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        nome_equipamento: event.target.value
                                    }
                                })}
                                value={this.state.dados.nome_equipamento}
                                idSpam='validar_nome'
                                idLabel='label_nome' />
                            <InputAndLabel
                                icone='local_offer' idAndFor='marca'
                                type='text' label='Marca'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        marca: event.target.value
                                    }
                                })}
                                value={this.state.dados.marca}
                                idSpam='validar_marca'
                                idLabel='label_marca' />
                            <InputAndLabel
                                icone='add_to_queue' idAndFor='modelo'
                                type='text' label='Modelo'
                                typeInput='input-field col m4'
                                onChange={event => this.setState({
                                    dados: {
                                        ...this.state.dados,
                                        modelo: event.target.value
                                    }
                                })}
                                value={this.state.dados.modelo}
                                idSpam='validar_modelo'
                                idLabel='label_modelo' />

                            <div className="input-field col s6">
                                <i className="material-icons prefix">mode_edit</i>
                                <textarea id="icon_prefix2" className="materialize-textarea"
                                    onChange={
                                        event => this.setState({
                                            dados: {
                                                ...this.state.dados,
                                                descricao: event.target.value,
                                            }
                                        })}
                                    value={this.state.dados.descricao} />
                                <label id='label_descricao' htmlFor="icon_prefix2">Descrição</label>
                                <span style={{ color: 'red' }} id='validar_descricao'></span>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='row right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() => this.btnCancelar()} />
                            < Button class='waves-effect waves-light btn '
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

Equipamento = reduxForm({ form: 'Equipamento' })(Equipamento)
const mapStateToProps = store => ({ equipamento: store.equipamentoReducer.equipamento })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Equipamento)