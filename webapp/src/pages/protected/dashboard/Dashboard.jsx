import React from 'react';
import AdminDashboard from './admin';
import { Roles } from '../../../model';

export default ({role}) => {
    return (
        <div>
            {
                role === Roles.ADMIN && (
                    <AdminDashboard/>
                )
            }
        </div>
    )
}