import React from 'react';
import { Route, Redirect } from 'react-router-dom'
export default ({ children, forward, to, ...rest }) => (
    <Route {...rest} render={props => forward ? children : <Redirect to={to} />} />
)