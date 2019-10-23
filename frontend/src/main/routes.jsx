import React from 'react';

import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Login from '../pages/login/Login';
import Usuario from '../pages/usuario/Usuario';
import Dashboard from '../pages/dashboard/Dashboard';
import AmbienteList from '../pages/ambiente/AmbienteList';
import EquipamentoList from '../pages/equipamento/EquipamentoList';
import DisciplinaList from '../pages/disciplina/DisciplinaList';
import FuncaoList from '../pages/funcao/FuncaoList';
import Agendamento from '../pages/agendamento/Agendamento.jsx';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={Login} />
                <Route path='/usuario' component={Usuario} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/ambienteList' component={AmbienteList} />
                <Route path='/equipamentoList' component={EquipamentoList} />
                <Route path='/disciplinaList' component={DisciplinaList} />
                <Route path='/funcaoList' component={FuncaoList} />
                <Route path='/agendamento' component={Agendamento} />
                {/* <Redirect from='*' to='/' /> */}
            </Switch>
        </BrowserRouter>

    );
}