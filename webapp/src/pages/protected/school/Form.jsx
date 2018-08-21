import React, { Component } from 'react';
import { Place } from '../../../model';
import neighborhoods from '../../../utils/neighborhoods';
import { postRequest } from '../../../utils/http';
import { Wizard, Mask, DatePicker } from '../../../components';
import { Row, Col, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

const Required = () => (<span className="text-danger">*</span>);

export default class Form extends Component {
    constructor(){
        super();
        const school = new Place();
        school.school = true;
        this.state = {
            err: {
                nameErr:{},
                cnpjErr:{},
                phoneErr:{},
                cpfErr: {},
                passwordErr: {},
                birthErr: {},
                nameResponsibleErr: {},
                companyErr: {},
                jobErr: {},
                emailErr: {},
                cityErr: {},
                streetErr: {}
            },
            confirmPassword: '',
            cities: [
                'Florianópolis',
                'Palhoça',
                'São José'
            ],
            neighborhoods,
            school
        }
    }

    //school
    handlerName(event){
        const { school, err } = this.state;
        school.name = event.target.value;
        err.nameErr = { invalid: !school.name };
        this.setState({ school, err });
    }

    handlerCnpj(event){
        const { school, err } = this.state;
        school.id = event.target.value.replace(/[-./]/g, '');
        err.cnpjErr = { invalid: !school.id };
        this.setState({ school, err });
    }

    handlerPhone(event){
        const { school, err } = this.state;
        school.phone = event.target.value.replace(/[-()]/g, '')
        school.responsible.phone = school.phone;
        err.phoneErr = { invalid: !school.phone };
        this.setState({ school, err });
    }

    //Responsible
    handlerCpf(event) {
        const { school, err } = this.state;
        const user = school.responsible;
        user.id = event.target.value.replace(/[-.]/g, '');
        err.cpfErr = { invalid: !user.id };
        school.responsible = user;
        this.setState({ school, err });
    }

    handlerResponsibleName(event) {
        const { school, err } = this.state;
        const user = school.responsible;
        user.name = event.target.value;
        err.nameErr = { invalid: !user.name };
        school.responsible = user;
        this.setState({ school, err });
    }

    handlerPassword(event) {
        const { school, err } = this.state;
        const user = school.responsible;
        user.password = event.target.value;
        err.passwordErr = { invalid: user.password !== this.state.confirmPassword }
        school.responsible = user;
        this.setState({ school, err });
    }

    handlerConfirmPassword(event) {
        const { school, err } = this.state;
        const user = school.responsible;
        let confirmPassword = this.state.confirmPassword;
        confirmPassword = event.target.value;
        err.passwordErr = { invalid: user.password !== confirmPassword }
        this.setState({ confirmPassword, err });
    }

    handlerEmail(event) {
        const { school, err } = this.state;
        const user = school.responsible;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        user.email = event.target.value;
        school.responsible = user;
        err.emailErr = { invalid: !re.test(user.email) }
        this.setState({ school, err });
    }

    handlerBirth(event){
        const { school, err } = this.state;
        const user = school.responsible;
        const { value } = event.target;
        user.birth = value ? new Date(value).toISOString() : value;
        school.responsible = user;
        err.birthErr = { invalid: !user.birth }
        this.setState({ school, err });
    }

    // Address
    handlerCity(event){
        const { school, err } = this.state;
        const { address } = school;
        address.city = event.target.value;
        err.cityErr = { invalid: !address.city };
        school.address = address;
        this.setState({ school, err });
    }

    handlerNeighborhood(event){
        const { school, err } = this.state;
        const { address } = school;
        address.neighborhood = event.target.value;
        err.neighborhoodErr = { invalid: !address.neighborhood };
        school.address = address;
        this.setState({ school, err });
    }

    handlerStreet(event){
        const { school, err } = this.state;
        const { address } = school;
        address.street = event.target.value;
        err.streetErr = { invalid: !address.street };
        school.address = address;
        this.setState({ school, err });
    }

    handlerNumber(event){
        const { school } = this.state;
        school.address.number = event.target.value;
        this.setState({ school }); 
    }

    validate(step){
        const { school, err, confirmPassword } = this.state;
        for (const key in err) {
            if (err.hasOwnProperty(key)) {
                const element = err[key];
                if(element.hasOwnProperty('invalid')){
                    if (element.invalid){
                        return false;
                    }
                } 
            }
        }
        switch(step.id){
            case 'step-0': {
                return school.name && school.id && school.phone;
            }
            case 'step-1': {
                const { responsible } = school;
                return responsible.id && responsible.email && responsible.birth && responsible.name && responsible.password && confirmPassword
            } 
            case 'step-2': {
                const { address } = school;
                return address.city && address.neighborhood && address.street
            }
            default: return true;
        }

    }

    handlerSubmit(){
        console.log(this.state.school);
        if (this.validate({id: 'step-2'})){
            postRequest(
                '/place',
                this.state.school,
                () => {
                    alert('Escola cadastrada com sucesso');
                    this.props.toggle()
                },
                res => alert(res.message)
            );
        }
    }

    render(){
        const { err, cities, neighborhoods, school} = this.state;
        const { address } = school;
        return (
            <Wizard onSubmit={this.handlerSubmit.bind(this)} onNext={this.validate.bind(this)} onBackClick={this.props.toggle} submitTitle="Cadastrar">
                <div>
                    <h3 className="text-align-center">Dados da Escola</h3>
                    <FormGroup>
                        <Label for="name">
                            Nome <Required/>
                        </Label>
                        <Input id="name" onChange={this.handlerName.bind(this)} {...err.nameErr} />
                        <FormFeedback tooltip>Nome é Obrigatório.</FormFeedback>
                    </FormGroup>
                    <Mask id="cnpj" label="CNPJ" onChange={this.handlerCnpj.bind(this)} mask="99.999.999/9999-99" type="tel" placeholder="##.###.###/####-##"
                        err={err.cnpjErr} errMessage="CNPJ inválido" />
                    <Mask id="phone" label="Número p/ Contato" onChange={this.handlerPhone.bind(this)} mask="(99)9999-9999" placeholder="(##)####-####" type="tel" err={err.phoneErr} 
                        errMessage="Número p/ Contato é Obrigatório" />
                </div>
                <div>
                    <h3 className="text-align-center">Dados da Responsável</h3>
                    <FormGroup>
                        <Label for="name">Nome Responsável</Label>
                        <Input id="name" onChange={this.handlerResponsibleName.bind(this)} {...err.nameResponsibleErr} />
                        <FormFeedback tooltip>Nome do Responsável é Obrigatório.</FormFeedback>
                    </FormGroup>
                    <DatePicker id="date" label="Nascimento" errMessage="Data inválida" onChange={this.handlerBirth.bind(this)} err={err.birthErr} />
                    <Mask id="cpf" label="CPF" onChange={this.handlerCpf.bind(this)} mask="999.999.999-99" type="tel" placeholder="###.###.###-##"
                        err={err.cpfErr} errMessage="CPF inválido" />
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
                                <FormFeedback tooltip>As senhas devem ser iguais.</FormFeedback>
                            </Col>
                        </Row>
                    </FormGroup>
                </div>
                <div>
                    <h3 className="text-align-center">Endereço da Escola</h3>
                    <FormGroup>
                        <Label for="city">Cidade <Required/></Label>
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
                </div>
            </Wizard>
        );
    }
}