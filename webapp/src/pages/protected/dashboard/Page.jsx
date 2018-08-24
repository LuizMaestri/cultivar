import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Roles } from '../../../model';
import { Row, Col } from 'reactstrap';
import AdminDashboard from './admin';
import VolunteerDashboard from './volunteer';
import CompanyDashboard from './company';

export default class extends Component{

    static propTypes = {
        user: PropTypes.object
    };

    getDashboards(user) {
        let dashboards = {};
        dashboards[Roles.ADMIN] = (<AdminDashboard />);
        dashboards[Roles.VOLUNTEER] = (<VolunteerDashboard user={user} />);
        dashboards[Roles.SCHOOL_ADMIN] = (null);
        dashboards[Roles.COMPANY_ADMIN] = (<CompanyDashboard user={user}/>);
        return user ? dashboards[user.role] : null;
    }

    render(){
        return (
            <Row>
                <Col>
                    {this.getDashboards(this.props.user)}
                </Col>
            </Row>
        );
    }
}
