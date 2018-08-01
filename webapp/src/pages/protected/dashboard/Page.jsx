import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Roles } from '../../../model';
import { Row, Col } from 'reactstrap';
import AdminDashboard from './admin';

let dashboards = {};
dashboards[Roles.ADMIN] = (<AdminDashboard/>);
dashboards[Roles.VOLUNTEER] = (null);
dashboards[Roles.SCHOOL_ADMIN] = (null);
dashboards[Roles.COMPANY_ADMIN] = (null);

class Dashboard extends Component{
    render(){
        return (
            <Row>
                <Col>
                    {dashboards[this.props.role]}
                </Col>
            </Row>
        );
    }
}

Dashboard.propTypes = {
    role: PropTypes.oneOf(Roles.values())
}

export default Dashboard;