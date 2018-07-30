import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FormLogin from './FormLogin';
import { Row, Col } from 'reactstrap';

class Login extends Component{
    static propTypes = {
        onAuthenticate: PropTypes.func
    };

    render(){
        return(
            <Row>
                <Col md="4 offset-4">
                    <FormLogin onSubmit={() => this.props.onAuthenticate()}/>
                </Col>
            </Row>
        );
    }
}

export default Login;