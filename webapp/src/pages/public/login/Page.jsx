import React from 'react'
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import Form from './Form.jsx';
import { Link } from 'react-router-dom';

const Login = props => (
    <div>
        <Row>
            <Col md="4 offset-4">
                <Form onSubmit={() => this.props.onAuthenticate()} />
            </Col>
        </Row>
        <Row>
            <Col md="4 offset-4">
                <Link to="/cadastro">Cadastrar</Link>
            </Col>
        </Row>
    </div>
);

Login.propTypes = {
    onAuthenticate: PropTypes.func.isRequired
};

export default Login;