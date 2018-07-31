import React from 'react';
import RedirectRoute from './RedirectRoute.jsx';
export default ({ component, logged, ...rest }) => (
    <RedirectRoute {...rest} forward={logged} component={component} to="/login"/>
);