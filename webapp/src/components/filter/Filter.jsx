import React from 'react';
import { Row, Col, Form } from 'reactstrap';
import { Input } from '../form'

export default ({ handlerFilter }) => (
    <Row style={{ marginBottom: '5px' }}>
        <Col>
            <Form inline>
                <Input id="filter" label=" " onChange={handlerFilter} />
            </Form>
        </Col>
    </Row>
);