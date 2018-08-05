// @flow
import React, { Component } from 'react';
import { setHeaders, postRequest } from '../../../utils/http';
import { saveObject, save } from '../../../utils/storage';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';
import { Mask } from '../../../components';

export default class extends Component {
    constructor(){
        super();
        this.state = {
            user: {
                cpf: '',
                password: ''
            },
            err: {
                loginErr: false,
                passwordErr: {},
                cpfErr:{},
            }
        };
    }

    static propTypes = {
        onSubmit: PropTypes.func
    };

    handlerCpf(event){
        const { user, err } = this.state;
        err.cpfErr = {};
        err.loginErr = false;
        user.cpf = event.target.value.replace(/[-\.]/g, '');
        this.setState({ user });
    }

    handlerPassword(event){
        const { user, err } = this.state;
        err.passwordErr = {};
        err.loginErr = false;
        user.password = event.target.value;
        this.setState({ user, err });
    }

    handlerSubmit(event){
        event.preventDefault();
        const { err, user } = this.state;
        if(!user.cpf || !user.password){
            if(!user.cpf){
                err.cpfErr = {
                    invalid: true
                }
            }
            if (!user.password) {
                err.passwordErr = {
                    invalid: true
                }
            }
            this.setState({ err });
            return;
        }
        postRequest('auth', user,
            res => {
                if (res.status !== 200) {
                    const { err } = this.state;
                    err.loginErr = true;
                    this.setState({ err });
                } else {
                    let { user, token } = res.data;
                    setHeaders();
                    save('token', token);
                    saveObject('user', user);
                    save('authenticated', true);
                    this.props.onSubmit();
                }
            },
            () => {
                const { err } = this.state;
                err.loginErr = true;
                this.setState({ err });
            }
        );
    }

    render() {
        const { err } = this.state;
        return (
            <Form onSubmit={this.handlerSubmit.bind(this)}>
                <Mask id="cpf" label="CPF" onChange={this.handlerCpf.bind(this)} mask="999.999.999-99" type="tel" placeholder="CPF - ###.###.###-##"
                    err={err.cpfErr} errMessage="CPF inválido" />
                <FormGroup>
                    <Label for="password">Senha</Label>
                    <Input id="password" type="password" placeholder="Senha" onChange={this.handlerPassword.bind(this)} { ...err.passwordErr }/>
                    <FormFeedback tooltip>Senha obrigatória</FormFeedback>
                </FormGroup>
                <Button color="primary" size="lg" block>
                    Login
                </Button>
            </Form>
        );
    }
}