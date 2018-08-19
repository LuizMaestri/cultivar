import React, { Component } from 'react';
import { Volunteer } from '../../../model';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Mask, DatePicker } from '../../../components';
import { getRequest } from '../../../utils/http';
import axios from 'axios';

const request = url => getRequest(url, res => res.data, () => [])

export default class extends Component{
    constructor(){
        super();
        this.state = {
            user: new Volunteer(),
            err: {
                cpfErr: {},
                passwordErr: {},
                nascErr: {},
                nameErr: {},
                companyErr: {},
                jobErr: {},
                emailErr: {}
            },
            companies: [],
            cities: [],
            confirmPassword: '',
            back: false
        };
    }

    componentWillMount(){
        axios.all([request('/place/company'), request('/address/city')])
            .then(res => this.setState({ companies: res[0], cities: res[1]}));
    }

    handlerCpf(event){
        const { user, err } = this.state;
        user.id = event.target.value.replace(/[-\.]/g, '');
        err.cpfErr = { invalid: !user.id};
        this.setState({ user, err });
    }

    handlerName(event){
        const { user, err } = this.state;
        user.name = event.target.value;
        err.nameErr = { invalid: !user.name};
        this.setState({ user, err });
    }

    handlerPassword(event){
        const { user, err } = this.state;
        user.password = event.target.value;
        err.passwordErr = { invalid: user.password !== this.state.confirmPassword }
        this.setState({ user, err });
    }

    handlerConfirmPassword(event) {
        const { user, err } = this.state;
        let confirmPassword = this.state.confirmPassword;
        confirmPassword = event.target.value;
        err.passwordErr = { invalid: user.password !== confirmPassword }
        this.setState({ confirmPassword, err });
    }

    handlerCompany(event){
        const { user, err } = this.state;
        let companyId = event.target.value;
        if(companyId !== null){
            for (const company of this.state.companies) {
                if (company.id === companyId){
                    user.company = company;
                    break;
                }
            }
        } else {
            user.company = companyId;
        }
        err.companyErr = { invalid: !companyId }
        this.setState({ user, err })
    }

    handlerJob(event){
        const { user, err } = this.state;
        user.job = event.target.value;
        err.jobdErr = { invalid: !user.job }
        this.setState({ user, err });
    }

    handlerEmail(event){
        const { user, err } = this.state;
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        user.email = event.target.value;
        err.emailErr = { invalid: !re.test(user.email) }
        this.setState({ user, err });
    }

    render(){
        const { err, companies, back } = this.state;
        if (!back){
            return (
                <Form>
                    <legend>Inscreva-se</legend>
                    <FormGroup>
                        <Label for="name">Nome Completo</Label>
                        <Input id="name" onChange={this.handlerName.bind(this)} {...err.nameErr} />
                    </FormGroup>
                    <DatePicker id="date" label="Nascimento" errMessage="Data inválida" err={err.nascErr}/>
                    
                    <Mask id="cpf" label="CPF" onChange={this.handlerCpf.bind(this)} mask="999.999.999-99" type="tel" placeholder="###.###.###-##"
                        err={err.cpfErr} errMessage="CPF inválido" />
                    <FormGroup>
                        <Label for="company">Empresa</Label>
                        <Input type="select" name="company" id="exampleSelect" onSelect={this.handlerCompany.bind(this)} {...err.companyErr}>
                            <option>Selecione</option>
                            {!companies.length ? companies.map(company => (<option value={company.id}>{company.name}</option>)): null}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="job">Função</Label>
                        <Input id="job" onChange={this.handlerJob.bind(this)} disabled={!this.state.user.company.id} {...err.jobErr} />
                        <FormFeedback tooltip></FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input id="email" type="email" onChange={this.handlerEmail.bind(this)} {...err.emailErr} />
                        <FormFeedback tooltip>Email inválido</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Row>
                            <Col>
                                <Input id="password" type="password" placeholder="Senha" onChange={this.handlerPassword.bind(this)} {...err.passwordErr} />
                                <FormFeedback tooltip>Senha obrigatória</FormFeedback>
                            </Col>
                            <Col>
                                <Input id="confirmPassword" type="password" placeholder="Confirmar Senha" onChange={this.handlerConfirmPassword.bind(this)} {...err.passwordErr} />
                                <FormFeedback tooltip>Senhas senhas devem ser iguais.</FormFeedback>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Button id="cancel" type="button" color="danger" onClick={e => this.setState({back: true})}>
                                    Voltar
                                </Button>
                            </Col>
                            <Col>
                                <Button id="submit" type="submit" color="primary" className="float-right">
                                    Cadastrar
                                </Button>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
            );
        } else {
            return (<Redirect to="/login" />);
        }
    }
}