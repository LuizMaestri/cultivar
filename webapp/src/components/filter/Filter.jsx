import React from 'react';
import { Row, Col, Form } from 'reactstrap';
import PropTypes from 'prop-types'
import { Input } from '../form'

const Filter = ({ value, label, handlerFilter }) => (
    <Row style={{ marginBottom: '5px' }}>
        <Col>
            <Form inline>
                <Input id="filter" value={value} label={label} onChange={handlerFilter} />
            </Form>
        </Col>
    </Row>
);

Filter.propTypes = {
    handlerFilter: PropTypes.func.isRequired,
    value: PropTypes.string,
    label: PropTypes.string
}

Filter.defaultProps ={
    label: " "
}

export default Filter;