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

class Equipamentos_mult extends Component {
    constructor() {
        super();
        this.state = {
            dados: {

            }
        }
        this.handleClick = this.handleClick.bind(this);

    }
    render() {
        return (
            <>
            </>
        )
    }
}

const mapStateToProps = store => ({})
const mapDispatchToProps = dispatch => bindActionCreators({ clickButtonEdit }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Equipamentos_mult)