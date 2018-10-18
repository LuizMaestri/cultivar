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
        postRequest('/auth', this.state, res => this.props.afterLogin(res.data.user));
    }

    render(){
        const { logged } = this.props;
        const { cpf, password } = this.state;
        return !logged ? (
            <Row>
                <Col/>
                <Col md="4" sm="10">
                    <Row>
                        <Col>
                            <Form onKeyPress={({ key }) => key === 'Enter' && this.handlerSubmit()}>
                                <Input id="login" label="Usuário" value={cpf} onChange={this.handlerUsername}/>
                                <Input id="password" label="Senha" type="password" value={password} onChange={this.handlerPassword}/>
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