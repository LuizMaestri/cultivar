import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import VolunteerList from './volunteer';
import EventList from './event';
import { getRequest } from '../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            school: null,
            volunteers: [],
            events: []
        };
    }
    componentWillMount(){
        const { cpf } = this.props;
        getRequest(`/school?cod_cpf=${cpf}`, res => this.setState({ school: res.data[0]}));
    }
    
    render() {
        const { school } = this.state;
        if (school){
            return(
                <Row>
                    <Col md="1"/>
                    <Col>
                        <EventList codSchool={school.codSchool}/>
                    </Col>
                    <Col md="3">
                        <VolunteerList codSchool={school.codSchool}/>
                    </Col>
                    <Col md="1"/>
                </Row>
            );
        } else {
            return null;
        }
    }
}