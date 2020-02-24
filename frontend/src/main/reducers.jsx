import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import funcaoReducer from '../pages/funcao/funcaoReducer';

const rootReducer = combineReducers({
    form: formReducer,
    funcaoReducer: funcaoReducer,
})

export default rootReducer