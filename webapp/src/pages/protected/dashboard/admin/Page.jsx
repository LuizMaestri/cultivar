import React from 'react';
import ListAttachment from './attachment';
import ListQuestion from './question';
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
                <Col style={{height: '900px'}}>
                    <ListEvent/>
                </Col>
            </Row>
            <Hr/>
            <Row>
                <Col>
                    <ListAttachment/>
                </Col>
                <Col md="1" />
                <Col>
                    <ListQuestion/>
                </Col>
            </Row>
        </Col>
        <Col md="1"/>
    </Row>
);