import React, { Component } from 'react';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import { usuarioLogado } from './loginActions';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import './Login.css';
import Button from '../../componentes/common/button';

import Usuario from '../usuario/Usuario';
import Api from '../../Api';

class Login extends Component {

    constructor() {
        super();
        this.state = {
            login: '',
            senha: '',
        }
    }

    async validarLogin(event) {
        const usuario = await Api.validarLogin(this.state.login, this.state.senha);

        if (usuario.data.dados.length > 0) {
            const { history } = this.props;
            history.push('/app/dashboard');
        } else {
            document.getElementById('validar_login').innerText = 'Usuário ou Senha incorreto';
        }
    }

    render() {
        return (
            <div className='row'>
                <div className='col s12 m12 l12'>
                    <div className='container'>
                        <div className='row login-container'>
                            <form className='col s12 m12 l12 z-depth-4'>
                                <div className="card-panel teal lighten-2" id="card-login">
                                    <h1 className="center-align">Login</h1>
                                </div>
                                <div className='row' id='campos'>
                                    <span style={{color: 'red'}} id='validar_login'></span>
                                    <InputAndLabel
                                        typeInput='input-field col s12 m12 l12'
                                        icone='mail_outline'
                                        idAndFor='email' type='text'
                                        label='Email'
                                        onChange={event => this.setState({
                                            login: event.target.value
                                        })}
                                        value={this.state.login} />
                                    <InputAndLabel
                                        typeInput='input-field col s12 m12 l12'
                                        icone='lock_outline'
                                        idAndFor='senha' type='password'
                                        label='Senha'
                                        onChange={event => this.setState({
                                            senha: event.target.value
                                        })}
                                        value={this.state.senha} />
                                </div>

                                <Button class='waves-effect waves-light btn btn-logar'
                                    name='Logar'
                                    onClick={() => this.validarLogin()}
                                    type='button'
                                />

                                <div id="cadastrar" className="row">
                                    <Usuario />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = store => ({
    login: store.loginReducer.login
})
const mapDispatchToProps = dispatch => bindActionCreators({ usuarioLogado }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Login)