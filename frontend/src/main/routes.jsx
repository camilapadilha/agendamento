import React from 'react';

import { Route, BrowserRouter} from 'react-router-dom';
import Login from '../pages/login/Login';
import Usuario from '../pages/usuario/Usuario';
import Dashboard from '../pages/dashboard/Dashboard';
import Ambiente from '../pages/ambiente/Ambiente';
import EquipamentoList from '../componentes/List';
import Disciplina from '../pages/disciplina/Disciplina';
import Funcao from '../pages/funcao/Funcao';


export default function Routes() {
    return (
        <BrowserRouter>
            {/* <Route path='/' component={Dashboard} /> */}
            <Route path='/' exact component={Login}/>
            <Route path='/usuario' component={Usuario}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/ambiente' component={Ambiente}/>
            <Route path='/equipamentoList' component={EquipamentoList}/>
            <Route path='/disciplina' component={Disciplina}/>
            <Route path='/funcao' component={Funcao}/>
            {/* <Redirect from='*' to='/' /> */}
        </BrowserRouter>

    );
}