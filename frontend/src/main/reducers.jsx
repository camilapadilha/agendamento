import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import funcaoReducer from '../pages/funcao/funcaoReducer';
import disciplinaReducer from '../pages/disciplina/disciplinaReducer';
import usuarioReducer from '../pages/usuario/usuarioReducer';
import equipamentoReducer from '../pages/equipamento/equipamentoReducer';
import ambienteReducer from '../pages/ambiente/ambienteReducer';
import loginReducer from '../pages/login/loginReducer';

const rootReducer = combineReducers({
    form: formReducer,
    funcaoReducer,
    disciplinaReducer,
    usuarioReducer,
    equipamentoReducer,
    ambienteReducer,
    loginReducer
});

export default rootReducer;