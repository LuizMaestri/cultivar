import React from 'react';
import { Route, Redirect } from 'react-router-dom'
export default ({ component, forward=false, to='/', ...rest }) => (
    <Route {...rest} render={props => forward ? component : <Redirect to={to} />} />
)