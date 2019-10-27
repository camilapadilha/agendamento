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
import Nav from '../componentes/layout/Nav';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/login' exact component={Login} />
                <Route path='/app' component={Nav} />
                <Route path='/app/usuario' component={Usuario} />
                <Route path='/app/dashboard' component={Dashboard} />
                <Route path='/app/ambienteList' component={AmbienteList} />
                <Route path='/app/equipamentoList' component={EquipamentoList} />
                <Route path='/app/disciplinaList' component={DisciplinaList} />
                <Route path='/app/funcaoList' component={FuncaoList} />
                <Route path='/app/agendamento' component={Agendamento} />
                {/* <Redirect from='*' to='/' /> */}
            </Switch>
        </BrowserRouter>

    );
}