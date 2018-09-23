import React, { Component } from 'react';
import { School, SchoolType } from '../../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../../utils/http';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input, MaskInput, DatePicker } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            school: new School(),
            confirmPassword: null
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerPhone = this.handlerPhone.bind(this);
        this.handlerType = this.handlerType.bind(this);
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


    //school
    handlerName(event){
        const { school } = this.state;
        school.name = event.target.value;
        this.setState({ school });
    }

    handlerPhone(event){
        const { school } = this.state;
        school.phone = event.target.value.replace(/[()-]/g, '');
        this.setState({ school });
    }

    handlerType(event) {
        const { school } = this.state;
        school.type = event.target.value;
        this.setState({ school });
    }

    // responsible
    handlerNameResponsible(event){
        const { school } = this.state;
        const { responsible } = school;
        responsible.name = event.target.value;
        school.responsible = responsible;
        this.setState({ school });
    }
    
    handlerCpf(event){
        const { school } = this.state;
        const { responsible } = school;
        responsible.cpf = event.target.value.replace(/[.-]/g, '');
        school.responsible = responsible;
        this.setState({ school });
    }
    
    handlerPhoneResponsible(event) {
        const { school } = this.state;
        const { responsible } = school;
        responsible.phone = event.target.value.replace(/[()-]/g, '');
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerJob(event){
        const { school } = this.state;
        const { responsible } = school;
        responsible.job = event.target.value;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerEmail(event){
        const { school } = this.state;
        const { responsible } = school;
        responsible.email = event.target.value;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerBirth(event){
        const { school } = this.state;
        const { responsible } = school;
        const { value } = event.target;
        responsible.birth = value ? new Date(value) : null;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerPassword(event){
        const { school } = this.state;
        const { responsible } = school;
        responsible.password = event.target.value;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerConfirmPassword(event){
        let { confirmPassword } = this.state;
        confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    }

    //address
    handlerCity(event){
        const { school } = this.state;
        const { responsible, address } = school;
        address.city = event.target.value;
        school.address = responsible.address = address;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerNeighborhood(event){
        const { school } = this.state;
        const { responsible, address } = school;
        address.neighborhood = event.target.value;
        school.address = responsible.address = address;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerStreet(event){
        const { school } = this.state;
        const { responsible, address } = school;
        address.street = event.target.value;
        school.address = responsible.address = address;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerNumber(event){
        const { school } = this.state;
        const { responsible, address } = school;
        address.number = event.target.value;
        school.address = responsible.address = address;
        school.responsible = responsible;
        this.setState({ school });
    }

    handlerSubmit(){
        const { afterSubmit, close } = this.props;
        const { school } = this.state;
        postRequest(
            '/school',
            school,
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { close, isOpen } = this.props;
        const { school, confirmPassword } = this.state;
        const { address, responsible } = school;
        const maxDate = new Date().toJSON().split('T')[0];
        return (
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>Nova Empresa</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3>Dados da Escola</h3>
                            <Input id="nameCompany" label="Nome da Escola" invalidMessage="Nome da Escola é obrigatório" value={school.name} onChange={this.handlerName} required/>
                            <MaskInput id="phone" label="Contato da Empresa" invalidMessage="Contato da Escola é obrigatório" value={school.phone} mask="(99)9999-9999" onChange={this.handlerPhone} required/>
                            <Input id="schoolType" type="select" label="???" invalidMessage="??? é obrigatório" value={school.schoolType} onChange={this.handlerType} required >
                                <option value="">Selecione</option>
                                {
                                    SchoolType.values().map(
                                        type => <option key={type} value={type}>{SchoolType.translate(type)}</option>
                                    )
                                }
                            </Input>
                            <hr className="row"/>
                        </div>
                        <div>
                            <h3>Dados do responsável</h3>
                            <Input id="nameReponsible" label="Nome Completo" invalidMessage="Nome Completo é obrigatório" value={responsible.name} onChange={this.handlerNameResponsible} required />
                            <MaskInput id="cpf" label="CPF" invalidMessage="CPF é obrigatório" value={responsible.cpf} mask="999.999.999-99" onChange={this.handlerCpf} required />
                            <MaskInput id="phoneResponsible" label="Contato do Responsável" invalidMessage="Contato do Responsável é obrigatório" value={responsible.phone} mask="(99)9999-9999" onChange={this.handlerPhoneResponsible} required />
                            <Input id="job" label="Cargo do Responsável" invalidMessage="Cargo do Responsável é obrigatório" value={responsible.job} onChange={this.handlerJob} required />
                            <DatePicker id="birth" label="Nascimento" invalidMessage="Nascimento é obrigatório" max={maxDate} onChange={this.handlerBirth} required />
                            <Input id="email" type="email" label="Email" invalidMessage="Email é obrigatório" value={responsible.email} onChange={this.handlerEmail} required />
                            <Row>
                                <Col>
                                    <Input id="password" type="password" label="Senha" invalidMessage="Senha é obrigatório" value={responsible.password} onChange={this.handlerPassword} required />
                                </Col>
                                <Col>
                                    <Input id="passwordConfirm" type="password" label="Confirmar Senha" invalidMessage="As senhas devem ser idênticas" value={confirmPassword} onChange={this.handlerConfirmPassword} required />
                                </Col>
                            </Row>
                            <hr className="row"/>
                        </div>
                        <div>
                            <h3>Endereço da Escola</h3>
                            <Input id="city" label="Cidade" invalidMessage="Cidade é obrigatório" value={address.city} onChange={this.handlerCity} required/>
                            <Input id="neighborhood" label="Bairro" invalidMessage="Bairro é obrigatório" value={address.neighborhood} onChange={this.handlerNeighborhood} required/>
                            <Row>
                                <Col>
                                    <Input id="street" label="Lougradouro" invalidMessage="Lougradouro é obrigatório" value={address.street} onChange={this.handlerStreet} required/>
                                </Col>
                                <Col md="3">
                                    <Input id="number" label="Número" value={address.number} onChange={this.handlerNumber}/>
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