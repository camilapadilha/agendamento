import React from 'react';
import ReactDOM from 'react-dom';
import 'materialize-css/dist/css/materialize.min.css';

import App from './main/app';
import { Provider } from 'react-redux';
import { createStore } from 'redux'

import reducers from './main/reducers';

const store = (createStore) (reducers)

ReactDOM.render(
    <Provider store={ store }>
        <App />
    </Provider>
    , document.getElementById('root'));

