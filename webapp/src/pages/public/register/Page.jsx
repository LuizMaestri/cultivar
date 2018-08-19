import React from 'react';
import Form from './Form';
import { Row, Col } from 'reactstrap';

export default () => (
    <Row>
        <Col md="4 offset-4">
            <Form/>
        </Col>
    </Row>
);