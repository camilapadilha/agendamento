import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';

import M from 'materialize-css/dist/js/materialize.min.js';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import Button from '../../componentes/common/button';

import './funcao.css';
import Api from '../../Api';
// import Api from '../../../../backend/src/Api.jsx';

export default class Funcao extends Component {

    constructor() {
        super();
        this.state = {
            dados: {
                nome: '',
            }
        }
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        M.AutoInit();
    }

    async handleClick() {
       const salvar = await Api.salvar(this.state.dados);
        if(salvar.status == true){
            this.setState({
                dados: {}
            });
            this.modal.hide();
        }
    }

    render() {
        return (
            <div className="row">
                <div className="right-align" id="botaoAdd">
                    <a className="btn-floating btn-large waves-effect waves-light red modal-trigger" href="#modal"><i className="material-icons">add</i></a>
                </div>

                <div id="modal" className="modal">
                    <div className="modal-content">
                        <form>
                            <div className="col m12" id="painel">
                                <h1>Cadastro de Função</h1>
                                <div className="row">
                                    <InputAndLabel
                                        icone='person' idAndFor='nome'
                                        type='text' label='Nome'
                                        typeInput='input-field col m4'
                                        onChange={event => this.setState({ 
                                            dados: { 
                                                nome: event.target.value 
                                            }
                                         })}
                                        value={this.state.dados.nome} />
                                </div>
                                <div className='row right-align' id='botoes'>
                                    <Button class='waves-effect waves-light btn modal-close'
                                        icone='clear' name='Cancelar' />
                                    <Button class='waves-effect waves-light btn'
                                        icone='send' name='Cadastrar'
                                        onClick={() => this.handleClick()} />
                                </div>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Funcao = reduxForm({ form: 'Funcao' })(Funcao)