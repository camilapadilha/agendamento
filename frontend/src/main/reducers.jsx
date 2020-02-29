import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import funcaoReducer from '../pages/funcao/funcaoReducer';
import disciplinaReducer from '../pages/disciplina/disciplinaReducer';

const rootReducer = combineReducers({
    form: formReducer,
    funcaoReducer: funcaoReducer,
    disciplinaReducer: disciplinaReducer,
})

export default rootReducer