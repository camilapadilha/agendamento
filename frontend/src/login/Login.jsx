import React, { Component } from 'react';

import { reduxForm, Field } from 'redux-form';
import InputAndLabel from '../componentes/common/InputAndLabel';
import './Login.css'


export default class Login extends Component {
    render() {
        return (
            <div className='row login-container -depth-4'>
                <form className='col s12'>
                    <div className="card-panel teal lighten-2" id="card-login">
                        <h1>Login</h1>
                    </div>
                    <div className='row'>
                        <Field
                            name='email' component={InputAndLabel} typeInput='input-field col m12'
                            icon='material-icons prefix' nameIcon='mail_outline'
                            id='email' type='text' class="validate"
                            label='Email' />
                        <Field
                            name='senha' component={InputAndLabel} typeInput='input-field col m12'
                            icon='material-icons prefix' nameIcon='vpn_key'
                            id='senha' type='password' class='validate'
                            label='Senha' />
                    </div>
                    <button type="submit" className="waves-effect waves-light btn">Logar</button>

                    <div id="cadastrar" className="row right-align">
                        <a href="#">Cadastre-se</a>
                    </div>
                </form>
            </div>
        )
    }
}

Login = reduxForm({ form: 'Login' })(Login)

