import React from 'react';
import RedirectRoute from './RedirectRoute.jsx';
export default ({ children, logged, ...rest }) => (
    <RedirectRoute {...rest} forward={logged} to="/login">
        { children }
    </RedirectRoute>
);