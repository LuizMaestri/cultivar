import React from 'react';
import { Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute.jsx';
export default (logged) => (<PrivateRoute logged={logged} component={(<Redirect to="/dashboard" />)} />)