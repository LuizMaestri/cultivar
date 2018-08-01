import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { FaPlus } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ListHeader = ({title, onClick}) => (
    <Row>
        <Col md="5" />
        <Col md="4">
            <h3>{ title }</h3>
        </Col>
        <Col md="2" />
        <Col md="1">
            <Button color="primary" size="lg" onClick={ onClick }><FaPlus /></Button>
        </Col>
    </Row>
);

ListHeader.propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default ListHeader;