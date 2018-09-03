import  React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { Button, Row, Col, Form } from 'reactstrap';
import { Input } from '../../../components';
import { postRequest } from '../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state={
            cpf: '',
            password: ''
        };
        this.handlerUsername = this.handlerUsername.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerUsername(event){
        this.setState({ cpf: event.target.value});
    }

    handlerPassword(event){
        this.setState({password: event.target.value});
    }

    handlerSubmit(){
        const { afterSubmit } = this.props;
        postRequest('/auth', this.state, afterSubmit);
    }

    render(){
        const { logged } = this.props;
        return !logged ? (
            <Row>
                <Col/>
                <Col>
                    <Row>
                        <Col>
                            <Form>
                                <Input id="login" label="Usuário" onChange={this.handlerUsername}/>
                                <Input id="password" label="Senha" type="password" onChange={this.handlerPassword}/>
                                <Button type="button" color="primary" size="lg" onClick={this.handlerSubmit} block>Entrar</Button>
                            </Form>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center">
                            <Link to="cadastrar">Quero ser voluntário</Link>
                        </Col>
                    </Row>
                </Col>
                <Col/>
            </Row>
        ) : (
            <Redirect to="/dashboard"/>
        );
    }
}