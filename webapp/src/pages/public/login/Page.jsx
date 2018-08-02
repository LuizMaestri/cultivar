import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Form from './Form.jsx';

const Login = props => (
    <Row>
        <Col md="4 offset-4">
            <Form onSubmit={() => this.props.onAuthenticate()} />
        </Col>
    </Row>
);

Login.propTypes = {
    onAuthenticate: PropTypes.func
};

export default Login;