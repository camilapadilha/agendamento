import React, { Component, useState } from 'react';
import { reduxForm, Field } from 'redux-form';

import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';
import M from 'materialize-css/dist/js/materialize.min.js';
import './disciplina.css';

import database from "../../firebase";

export default class Disciplina extends Component {
    constructor() {
        super();
        this.state = {
            nome: '',
        }
        this.handleClick = this.handleClick.bind(this);

    }
    componentDidMount() {
        M.AutoInit();
    }
    handleClick() {
        const db = database.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        const disciplinaRef = db.collection('disciplina').add({
          nome: this.state.nome,
        });  
        this.setState({
          nome: '',
        });

    }

    render() {
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
                                    onChange={event => this.setState({ nome: event.target.value })}
                                    value={this.state.nome}
                                />

                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className='right-align' id='botoes'>
                            <Button class='waves-effect waves-light btn modal-close'
                                icone='clear' name='Cancelar' />

                            <Button class='waves-effect waves-light btn'
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