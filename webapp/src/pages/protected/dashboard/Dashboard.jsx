import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import AdminDashboard from './admin';
import VolunteerDashboard from './volunteer';
import CompanyDashboard from './company';
import SchoolDashboard from './school';
import { Roles } from '../../../model';

export default ({cpf, role, logged}) => {
    return logged ? (
        <Fragment>
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
            {
                role === Roles.COMPANY_ADMIN && (
                    <CompanyDashboard cpf={cpf}/>
                )
            }
            {
                role === Roles.SCHOOL_ADMIN && (
                    <SchoolDashboard cpf={cpf}/>
                )
            }
        </Fragment>
    ) : <Redirect to='/login'/>
}