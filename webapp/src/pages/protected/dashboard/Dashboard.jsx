import React from 'react';
import AdminDashboard from './admin';
import VolunteerDashboard from './volunteer';
import { Roles } from '../../../model';

export default ({cpf, role}) => {
    return (
        <div>
            {
                role === Roles.ADMIN && (
                    <AdminDashboard/>
                )
            }
            {
                role === Roles.VOLUNTEER && (
                    <VolunteerDashboard cpf={cpf}/>
                )
            }
        </div>
    )
}