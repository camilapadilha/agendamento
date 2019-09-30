import React from 'react';

import { Route, BrowserRouter, Redirect } from 'react-router-dom';
import Login from '../login/Login';


export default function Routes() {
    return (
        <BrowserRouter>
            {/* <Route path='/' component={Dashboard} /> */}
            <Route path='/' exact component={Login} />
            <Redirect from='*' to='/' />
        </BrowserRouter>

    );
}