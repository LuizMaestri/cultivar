import React, { Component } from 'react';
import { Volunteer } from '../../../model';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Row, Col } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { Mask, DatePicker, Required } from '../../../components';
import { getRequest, postRequest } from '../../../utils/http';
import neighborhoods from '../../../utils/neighborhoods';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer: new Volunteer(),
            err: {
                cpfErr: {},
                passwordErr: {},
                nascErr: {},
                nameErr: {},
                companyErr: {},
                jobErr: {},
                emailErr: {},
                cityErr: {},
                neighborhoodErr: {},
                streetErr: {}
            },
            companies: [],
            confirmPassword: '',
            back: false,
            cities: [
                'Florianópolis',
                'Palhoça',
                'São José'
            ],
            neighborhoods
        };
    }

    componentWillMount(){
        getRequest('/place/company', res => this.setState({ companies: res.data}));
    }

    handlerCpf(event){
        const { volunteer, err } = this.state;
        volunteer.id = event.target.value.replace(/[-.]/g, '');
        err.cpfErr = { invalid: !volunteer.id};
        this.setState({ volunteer, err });
    }

    handlerPhone(event) {
        const { volunteer, err } = this.state;
        volunteer.phone = event.target.value.replace(/[-()]/g, '')
        err.phoneErr = { invalid: !volunteer.phone };
        this.setState({ volunteer, err });
    }

    handlerName(event){
        const { volunteer, err } = this.state;
        volunteer.name = event.target.value;
        err.nameErr = { invalid: !volunteer.name};
        this.setState({ volunteer, err });
    }

    handlerPassword(event){
        const { volunteer, err } = this.state;
        volunteer.password = event.target.value;
        err.passwordErr = { invalid: volunteer.password !== this.state.confirmPassword }
        this.setState({ volunteer, err });
    }

    handlerConfirmPassword(event) {
        const { volunteer, err } = this.state;
        let confirmPassword = this.state.confirmPassword;
        confirmPassword = event.target.value;
        err.passwordErr = { invalid: volunteer.password !== confirmPassword }
        this.setState({ confirmPassword, err });
    }

    handlerCompany(event){
        const { volunteer, err } = this.state;
        let companyId = event.target.value;
        volunteer.company.id = companyId;
        err.companyErr = { invalid: !companyId }
        this.setState({ volunteer, err })
    }

    handlerJob(event){
        const { volunteer, err } = this.state;
        volunteer.job = event.target.value;
        err.jobdErr = { invalid: !volunteer.job }
        this.setState({ volunteer, err });
    }

    handlerEmail(event){
        const { volunteer, err } = this.state;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        volunteer.email = event.target.value;
        err.emailErr = { invalid: !re.test(volunteer.email) }
        this.setState({ volunteer, err });
    }

    handlerBirth(event) {
        const { volunteer, err } = this.state;
        const { value } = event.target;
        volunteer.birth = value ? new Date(value).toISOString() : value;
        err.birthErr = { invalid: !volunteer.birth }
        this.setState({ volunteer, err });
    }

    // Address
    handlerCity(event) {
        const { volunteer, err } = this.state;
        const { address } = volunteer;
        address.city = event.target.value;
        err.cityErr = { invalid: !address.city };
        volunteer.address = address;
        this.setState({ volunteer, err });
    }

    handlerNeighborhood(event) {
        const { volunteer, err } = this.state;
        const { address } = volunteer;
        address.neighborhood = event.target.value;
        err.neighborhoodErr = { invalid: !address.neighborhood };
        volunteer.address = address;
        this.setState({ volunteer, err });
    }

    handlerStreet(event) {
        const { volunteer, err } = this.state;
        const { address } = volunteer;
        address.street = event.target.value;
        err.streetErr = { invalid: !address.street };
        volunteer.address = address;
        this.setState({ volunteer, err });
    }

    handlerNumber(event) {
        const { volunteer } = this.state;
        volunteer.address.number = event.target.value;
        this.setState({ volunteer });
    }

    handlerSubmit(){
        const { volunteer, confirmPassword} = this.state;
        const { address, company } = volunteer;
        if(volunteer.id && volunteer.birth && volunteer.email && volunteer.name && 
            volunteer.password && volunteer.job && company.id && address.city && 
            address.neighborhood && address.street){
            postRequest('/volunteer', volunteer, 
                () => {
                    alert("Cadastro realizado com sucesso.");
                    this.setState({ back: true })
                },
                res => alert(res.data)
            );
        } else {
            this.setState({
                err: {
                    cpfErr: {
                        invalid: !volunteer.id
                    },
                    passwordErr: {
                        invalid: (!volunteer.password || !confirmPassword) || volunteer.password !== confirmPassword
                    },
                    nascErr: {
                        invalid: !volunteer.birth
                    },
                    nameErr: {
                        invalid: !volunteer.name
                    },
                    companyErr: {
                        invalid: !company.id
                    },
                    jobErr: {
                        invalid: !volunteer.job
                    },
                    emailErr: {
                        invalid: !volunteer.email
                    },
                    cityErr: {
                        invalid: !address.city
                    },
                    neighborhoodErr: {
                        invalid: !address.neighborhood
                    },
                    streetErr: {
                        invalid: !address.street
                    }
                }
            })
        }
    }

    render(){
        const { err, companies, back, volunteer, cities } = this.state;
        const { address } = volunteer;
        if (!back){
            return (
                <Form>
                    <legend>Inscreva-se</legend>
                    <FormGroup>
                        <Label for="name">Nome Completo</Label>
                        <Input id="name" onChange={this.handlerName.bind(this)} {...err.nameErr} />
                    </FormGroup>
                    <DatePicker id="date" label="Nascimento" errMessage="Data inválida" onChange={this.handlerBirth.bind(this)} err={err.nascErr}/>
                    <Mask id="cpf" label="CPF" onChange={this.handlerCpf.bind(this)} mask="999.999.999-99" type="tel" placeholder="###.###.###-##"
                        err={err.cpfErr} errMessage="CPF inválido" />
                    <Mask id="phone" label="Número p/ Contato" onChange={this.handlerPhone.bind(this)} mask="(99)9999-9999" placeholder="(##)####-####" type="tel" err={err.phoneErr}
                        errMessage="Número p/ Contato é Obrigatório" />
                    <FormGroup>
                        <Label for="email">E-mail</Label>
                        <Input id="email" type="email" onChange={this.handlerEmail.bind(this)} {...err.emailErr} />
                        <FormFeedback tooltip>Email inválido</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="company">Empresa</Label>
                        <Input type="select" name="company" id="exampleSelect" onChange={this.handlerCompany.bind(this)} {...err.companyErr}>
                            <option>Selecione</option>
                            {companies.map(company => (<option value={company.id}>{company.name}</option>))}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="job">Função</Label>
                        <Input id="job" onChange={this.handlerJob.bind(this)} disabled={!volunteer.company.id} {...err.jobErr} />
                        <FormFeedback tooltip></FormFeedback>
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
                        <Label for="city">Cidade <Required /></Label>
                        <Input type="select" name="city" id="city" onChange={this.handlerCity.bind(this)} {...err.cityErr}>
                            <option value="">Selecione</option>
                            {cities.length ? cities.map(city => (<option key={city} value={city}>{city}</option>)) : null}
                        </Input>
                        <FormFeedback tooltip>Cidade é Obrigatório</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Label for="neighborhood">Bairro <Required /></Label>
                        <Input type="select" name="neighborhood" id="neighborhood" onChange={this.handlerNeighborhood.bind(this)} disabled={!address.city} {...err.neighborhoodErr}>
                            <option value="">Selecione</option>
                            {
                                neighborhoods.hasOwnProperty(address.city) && neighborhoods[address.city].length ?
                                    neighborhoods[address.city].map(neighborhood => (<option key={neighborhood} value={neighborhood}>{neighborhood}</option>)) : null
                            }
                        </Input>
                        <FormFeedback tooltip>Bairro é Obrigatório</FormFeedback>
                    </FormGroup>
                    <Row>
                        <Col md={10}>
                            <FormGroup>
                                <Label for="street">Lougradouro <Required /></Label>
                                <Input id="street" onChange={this.handlerStreet.bind(this)} disabled={!address.neighborhood} {...err.streetErr} />
                                <FormFeedback tooltip>Lougradouro é Obrigatório.</FormFeedback>
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="number">Número</Label>
                                <Input id="number" onChange={this.handlerNumber.bind(this)} disabled={!address.neighborhood} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Row>
                            <Col>
                                <Button id="cancel" type="button" color="danger" onClick={() => this.setState({back: true})}>
                                    Voltar
                                </Button>
                            </Col>
                            <Col>
                                <Button id="submit" type="button" color="primary" className="float-right" onClick={this.handlerSubmit.bind(this)}>
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