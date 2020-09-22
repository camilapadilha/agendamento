import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { clickButtonEdit } from './disciplinaActions';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';
import M from 'materialize-css/dist/js/materialize.min.js';
import './disciplina.css';
import Api from '../../Api';

class Disciplina extends Component {
    constructor() {
        super();
        this.state = {
            id_disciplina: '',
            dados: {
                nome_disciplina: '',
            }
        }
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        M.AutoInit();
    }

    limparCampos() {
        this.setState({
            id_disciplina: '',
            dados: {
                nome_disciplina: '',
            },
        });
    }

    inicializarForms() {
        document.getElementById('label_nome').setAttribute('class', 'active');
    }

    limparInicializacaoForms() {
        document.getElementById('label_nome').setAttribute('class', '');
    }

    limparValidacoes() {
        document.getElementById('validar_nome').innerText = '';
    }

    btnCancelar() {
        this.limparCampos();
        this.limparValidacoes();
        this.limparInicializacaoForms();
    }

    async handleClick() {
        let pode_salvar = true;
        this.limparValidacoes();
        if (this.state.dados.nome_disciplina == '') {
            pode_salvar = false;
            document.getElementById('validar_nome').innerText = 'Campo Obrigattório.';
        }
        if (pode_salvar) {
            var elem = document.getElementById('modal');
            var instance = M.Modal.getInstance(elem);
            await Api.salvarDisciplina(this.state.dados, this.state.id_disciplina);
            instance.close();
            this.limparValidacoes();
            this.limparCampos();
        }
    }

    render() {
        const { clickButtonEdit } = this.props;

        if (this.props.disciplina.acao == 'edit') {
            this.setState({
                id_disciplina: this.props.disciplina.value.id_disciplina,
                dados: {
                    nome_disciplina: this.props.disciplina.value.nome_disciplina,
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
                            <h1>Cadastro de Disciplina</h1>
                            <div className="row">
                                <InputAndLabel
                                    icone='import_contacts' idAndFor='nome'
                                    type='text' label='Nome da Disciplina'
                                    typeInput='input-field col s4 m4 l4'
                                    onChange={event => this.setState({
                                        dados: {
                                            ...this.state.dados,
                                            nome_disciplina: event.target.value
                                        }
                                    })}
                                    value={this.state.dados.nome_disciplina}
                                    idSpam='validar_nome'
                                    idLabel='label_nome' />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                classIcon='right'
                                icone='clear' name='Cancelar'
                                onClick={() =>
                                    this.btnCancelar()
                                } />

                            <Button class='waves-effect waves-light btn '
                                classIcon='right'
                                icone='send' name='Cadastrar'
                                onClick={() => this.handleClick()
                                } />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Disciplina = reduxForm({ form: 'Disciplina' })(Disciplina)
const mapStateToProps = store => ({ disciplina: store.disciplinaReducer.disciplina })
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Disciplina)