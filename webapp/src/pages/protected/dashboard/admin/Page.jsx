import React from 'react';
import ListCompany from './company';
import ListVolunteer from './volunteer';
import ListEvent from './event'
import ListSchool from './school';
import { Row, Col } from 'reactstrap';

const Hr = () => (
    <div>
        <br />
        <hr />
        <br />
    </div>
);

export default () => (
    <Row>
        <Col md="1"/>
        <Col>
            <Row>
                <Col/>
            </Row>
            <Hr/>
            <Row>
                <Col>
                    <ListCompany/>
                </Col>
                <Col md="1"/>
                <Col>
                    <ListVolunteer/>
                </Col>
                <Col md="1"/>
                <Col>
                    <ListSchool />
                </Col>
            </Row>
            <Hr/>
            <Row>
                <Col>
                    <ListEvent/>
                </Col>
            </Row>
            <Hr/>
        </Col>
        <Col md="1"/>
    </Row>
);