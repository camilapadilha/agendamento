import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import InputAndLabel from '../../componentes/common/InputAndLabel';
import './Login.css';

import Usuario from '../usuario/Usuario';

export default class Login extends Component {
    // redirecionar = () => {
    //     const {history} = this.props;
    //     history.push('/usuario');
    // }
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
                                    <Field
                                        typeInput='input-field col s12 m12 l12'
                                        name='email' component={InputAndLabel}
                                        icone='mail_outline'
                                        idAndFor='email' type='text'
                                        label='Email' />
                                    <Field
                                        typeInput='input-field col s12 m12 l12'
                                        name='senha' component={InputAndLabel}
                                        icone='lock_outline'
                                        idAndFor='senha' type='password'
                                        label='Senha' />
                                </div>

                                <button type="submit" className="waves-effect waves-light btn" >Logar</button>

                                <div id="cadastrar" className="row">
                                    <Usuario/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

Login = reduxForm({ form: 'Login' })(Login)

