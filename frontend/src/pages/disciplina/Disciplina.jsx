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
            dados: {
                id_disciplina: '',
                nome: '',
            }
        }
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        M.AutoInit();
    }
    async handleClick() {
        await Api.salvarDisciplina(this.state.dados);
        this.setState({
            dados: {
                id_disciplina: '',
                nome: '',
            },
        });
    }

    render() {
        const { clickButtonEdit } = this.props;

        if (this.props.disciplina.acao == 'edit') {
            this.setState({
                dados: {
                    id_disciplina: this.props.disciplina.value.id_disciplina,
                    nome: this.props.disciplina.value.nome,
                },
            });
            clickButtonEdit('', '');
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
                                    typeInput='input-field col m4'
                                    onChange={event => this.setState({
                                        dados: {
                                            ...this.state.dados,
                                            nome: event.target.value
                                        }
                                    })}
                                    value={this.state.dados.nome}
                                />

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                icone='clear' name='Cancelar' />

                            <Button class='waves-effect waves-light btn modal-close'
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