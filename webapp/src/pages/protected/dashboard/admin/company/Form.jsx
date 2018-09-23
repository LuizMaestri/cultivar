import React, { Component } from 'react';
import Company from '../../../../../model/company';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../../utils/http';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input, MaskInput, DatePicker } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            company: new Company(),
            confirmPassword: ''
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerPhone = this.handlerPhone.bind(this);
        this.handlerCnpj = this.handlerCnpj.bind(this);
        this.handlerNameResponsible = this.handlerNameResponsible.bind(this);
        this.handlerCpf = this.handlerCpf.bind(this);
        this.handlerPhoneResponsible = this.handlerPhoneResponsible.bind(this);
        this.handlerJob = this.handlerJob.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.handlerBirth = this.handlerBirth.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.handlerConfirmPassword = this.handlerConfirmPassword.bind(this);
        this.handlerCity = this.handlerCity.bind(this);
        this.handlerNeighborhood = this.handlerNeighborhood.bind(this);
        this.handlerStreet = this.handlerStreet.bind(this);
        this.handlerNumber = this.handlerNumber.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }
    
    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    }


    //company
    handlerName(event){
        const { company } = this.state;
        company.name = event.target.value;
        this.setState({ company });
    }

    handlerCnpj(event){
        const { company } = this.state;
        company.cnpj = event.target.value.replace(/[./-]/g, '');
        this.setState({ company });
    }

    handlerPhone(event){
        const { company } = this.state;
        company.phone = event.target.value.replace(/[()-]/g, '');
        this.setState({ company });
    }

    // responsible
    handlerNameResponsible(event){
        const { company } = this.state;
        const { responsible } = company;
        responsible.name = event.target.value;
        company.responsible = responsible;
        this.setState({ company });
    }
    
    handlerCpf(event){
        const { company } = this.state;
        const { responsible } = company;
        responsible.cpf = event.target.value.replace(/[.-]/g, '');
        company.responsible = responsible;
        this.setState({ company });
    }
    
    handlerPhoneResponsible(event) {
        const { company } = this.state;
        const { responsible } = company;
        responsible.phone = event.target.value.replace(/[()-]/g, '');
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerJob(event){
        const { company } = this.state;
        const { responsible } = company;
        responsible.job = event.target.value;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerEmail(event){
        const { company } = this.state;
        const { responsible } = company;
        responsible.email = event.target.value;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerBirth(event){
        const { company } = this.state;
        const { responsible } = company;
        const { value } = event.target;
        responsible.birth = value ? new Date(value) : null;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerPassword(event){
        const { company } = this.state;
        const { responsible } = company;
        responsible.password = event.target.value;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerConfirmPassword(event){
        let { confirmPassword } = this.state;
        confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    }

    //address
    handlerCity(event){
        const { company } = this.state;
        const { responsible, address } = company;
        address.city = event.target.value;
        company.address = responsible.address = address;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerNeighborhood(event){
        const { company } = this.state;
        const { responsible, address } = company;
        address.neighborhood = event.target.value;
        company.address = responsible.address = address;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerStreet(event){
        const { company } = this.state;
        const { responsible, address } = company;
        address.street = event.target.value;
        company.address = responsible.address = address;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerNumber(event){
        const { company } = this.state;
        const { responsible, address } = company;
        address.number = event.target.value;
        company.address = responsible.address = address;
        company.responsible = responsible;
        this.setState({ company });
    }

    handlerSubmit(){
        const { afterSubmit, close } = this.props;
        const { company } = this.state;
        postRequest(
            '/company',
            company,
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { close, isOpen } = this.props;
        const { company, confirmPassword } = this.state;
        const { address, responsible } = company;
        const maxDate = new Date().toJSON().split('T')[0];
        return (
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>Nova Empresa</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3>Dados da Empresa</h3>
                            <Input id="nameCompany" label="Nome Fantasia" invalidMessage="Nome Fantasia é obrigatório" value={company.name} onChange={this.handlerName} required/>
                            <MaskInput id="cnpj" label="CNPJ" invalidMessage="CNPJ é obrigatório" mask="99.999.999/9999-99" value={company.cnpj} onChange={this.handlerCnpj} required/>
                            <MaskInput id="phone" label="Contato da Empresa" invalidMessage="Contato da Empresa é obrigatório" value={company.phone} mask="(99)9999-9999" onChange={this.handlerPhone} required/>
                            <hr className="row"/>
                        </div>
                        <div>
                            <h3>Dados do responsável</h3>
                            <Input id="nameReponsible" label="Nome Completo" invalidMessage="Nome Completo é obrigatório" value={responsible.name} onChange={this.handlerNameResponsible} required/>
                            <MaskInput id="cpf" label="CPF" invalidMessage="CPF é obrigatório" value={responsible.cpf} mask="999.999.999-99" onChange={this.handlerCpf} required />
                            <MaskInput id="phoneResponsible" label="Contato do Responsável" invalidMessage="Contato do Responsável é obrigatório" value={responsible.phone} mask="(99)9999-9999" onChange={this.handlerPhoneResponsible} required/>
                            <Input id="job" label="Cargo do Responsável" invalidMessage="Cargo do Responsável é obrigatório" value={responsible.job} onChange={this.handlerJob} required/>
                            <DatePicker id="birth" label="Nascimento" invalidMessage="Nascimento é obrigatório" max={maxDate} onChange={this.handlerBirth} required/>
                            <Input id="email" type="email" label="Email" invalidMessage="Email é obrigatório" value={responsible.email} onChange={this.handlerEmail} required/>
                            <Row>
                                <Col>
                                    <Input id="password" type="password" label="Senha" invalidMessage="Senha é obrigatório" value={responsible.password} onChange={this.handlerPassword} required/>
                                </Col>
                                <Col>
                                    <Input id="passwordConfirm" type="password" label="Confirmar Senha" invalidMessage="As senhas devem ser idênticas" value={confirmPassword} onChange={this.handlerConfirmPassword} required/>
                                </Col>
                            </Row>
                            <hr className="row"/>
                        </div>
                        <div>
                            <h3>Endereço da Empresa</h3>
                            <Input id="city" label="Cidade" invalidMessage="Cidade é obrigatório" value={address.city} onChange={this.handlerCity} required />
                            <Input id="neighborhood" label="Bairro" invalidMessage="Bairro é obrigatório" value={address.neighborhood} onChange={this.handlerNeighborhood} required />
                            <Row>
                                <Col>
                                    <Input id="street" label="Lougradouro" invalidMessage="Lougradouro é obrigatório" value={address.street} onChange={this.handlerStreet} required />
                                </Col>
                                <Col md="3">
                                    <Input id="number" label="Número" value={address.number} onChange={this.handlerNumber} />
                                </Col>
                            </Row>
                            <hr className="row"/>
                        </div>
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}