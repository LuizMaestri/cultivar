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
        this.state = {
            company: new Place(),
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
        }
    }

    //Company
    handlerName(event){
        const { company, err } = this.state;
        company.name = event.target.value;
        err.nameErr = { invalid: !company.name };
        this.setState({ company, err });
    }

    handlerCnpj(event){
        const { company, err } = this.state;
        company.id = event.target.value.replace(/[-./]/g, '');
        err.cnpjErr = { invalid: !company.id };
        this.setState({ company, err });
    }

    handlerPhone(event){
        const { company, err } = this.state;
        company.phone = event.target.value.replace(/[-()]/g, '')
        company.responsible.phone = company.phone;
        err.phoneErr = { invalid: !company.phone };
        this.setState({ company, err });
    }

    //Responsible
    handlerCpf(event) {
        const { company, err } = this.state;
        const user = company.responsible;
        user.id = event.target.value.replace(/[-.]/g, '');
        err.cpfErr = { invalid: !user.id };
        company.responsible = user;
        this.setState({ company, err });
    }

    handlerResponsibleName(event) {
        const { company, err } = this.state;
        const user = company.responsible;
        user.name = event.target.value;
        err.nameErr = { invalid: !user.name };
        company.responsible = user;
        this.setState({ company, err });
    }

    handlerPassword(event) {
        const { company, err } = this.state;
        const user = company.responsible;
        user.password = event.target.value;
        err.passwordErr = { invalid: user.password !== this.state.confirmPassword }
        company.responsible = user;
        this.setState({ company, err });
    }

    handlerConfirmPassword(event) {
        const { company, err } = this.state;
        const user = company.responsible;
        let confirmPassword = this.state.confirmPassword;
        confirmPassword = event.target.value;
        err.passwordErr = { invalid: user.password !== confirmPassword }
        this.setState({ confirmPassword, err });
    }

    handlerEmail(event) {
        const { company, err } = this.state;
        const user = company.responsible;
        let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        user.email = event.target.value;
        company.responsible = user;
        err.emailErr = { invalid: !re.test(user.email) }
        this.setState({ company, err });
    }

    handlerBirth(event){
        const { company, err } = this.state;
        const user = company.responsible;
        const { value } = event.target;
        user.birth = value ? new Date(value).toISOString() : value;
        company.responsible = user;
        err.birthErr = { invalid: !user.birth }
        this.setState({ company, err });
    }

    // Address
    handlerCity(event){
        const { company, err } = this.state;
        const { address } = company;
        address.city = event.target.value;
        err.cityErr = { invalid: !address.city };
        company.address = address;
        this.setState({ company, err });
    }

    handlerNeighborhood(event){
        const { company, err } = this.state;
        const { address } = company;
        address.neighborhood = event.target.value;
        err.neighborhoodErr = { invalid: !address.neighborhood };
        company.address = address;
        this.setState({ company, err });
    }

    handlerStreet(event){
        const { company, err } = this.state;
        const { address } = company;
        address.street = event.target.value;
        err.streetErr = { invalid: !address.street };
        company.address = address;
        this.setState({ company, err });
    }

    handlerNumber(event){
        const { company } = this.state;
        company.address.number = event.target.value;
        this.setState({ company }); 
    }

    validate(step){
        const { company, err, confirmPassword } = this.state;
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
                return company.name && company.id && company.phone;
            }
            case 'step-1': {
                const { responsible } = company;
                return responsible.id && responsible.email && responsible.birth && responsible.name && responsible.password && confirmPassword
            } 
            case 'step-2': {
                const { address } = company;
                return address.city && address.neighborhood && address.street
            }
            default: return true;
        }

    }

    handlerSubmit(){
        console.log(this.state.company);
        if (this.validate({id: 'step-2'})){
            postRequest(
                '/place',
                this.state.company,
                () => {
                    alert('Empresa cadastrada com sucesso');
                    this.props.toggle()
                },
                res => alert(res.message)
            );
        }
    }

    render(){
        const { err, cities, neighborhoods, company} = this.state;
        const { address } = company;
        return (
            <Wizard onSubmit={this.handlerSubmit.bind(this)} onNext={this.validate.bind(this)} onBackClick={this.props.toggle} submitTitle="Cadastrar">
                <div>
                    <h3 className="text-align-center">Dados da Empresa</h3>
                    <FormGroup>
                        <Label for="name">
                            Nome Fantasia <Required/>
                        </Label>
                        <Input id="name" onChange={this.handlerName.bind(this)} {...err.nameErr} />
                        <FormFeedback tooltip>Nome Fantasia é Obrigatório.</FormFeedback>
                    </FormGroup>
                    <Mask id="cnpj" label="CNPJ" onChange={this.handlerCnpj.bind(this)} mask="99.999.999/9999-9" type="tel" placeholder="##.###.###/####-#"
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
                    <h3 className="text-align-center">Endereço da Empresa</h3>
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