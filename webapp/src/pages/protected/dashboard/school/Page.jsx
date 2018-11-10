import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import VolunteerList from './volunteer';
import EventList from './event';
import EvaluateList from './evaluate';
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
        getRequest(`/user/${cpf}/school`, res => this.setState({ school: res.data}));
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
                        <Row style={{height:'450px'}}>
                            <Col>
                                <VolunteerList codSchool={school.codSchool}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <EvaluateList codSchool={school.codSchool}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="1"/>
                </Row>
            );
        } else {
            return null;
        }
    }
}