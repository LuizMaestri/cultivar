import React, { Component } from 'react';
import { getRequest, putRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';
import { Input } from '../../../../../components';
import { Status, Address, Schooling, School } from '../../../../../model';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label, Form } from 'reactstrap';
import pic from './pic.jpeg';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer: null,
            trainings: [],
            schools: [],
            err: {
                invalid: false
            }
        };
        this.handlerAprroved = this.handlerAprroved.bind(this);
        this.HandlerAssociate = this.HandlerAssociate.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
        this.HandlerSubmit = this.HandlerSubmit.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        axios.all([
            getRequest(`/volunteer/${cpf}`, res => res.data),
            getRequest('/school', res => res.data)
        ]).then(
            res => this.setState({
                volunteer: res[0],
                schools: res[1]
            })
        );
    }

    handlerDelete(){
        const { deleteFunc, close } = this.props;
        deleteFunc();
        close();
    }

    handlerAprroved(){
        const { close } = this.props;
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.status = Status.APPROVED;
        volunteer.user = user;
        putRequest(`/volunteer/${user.cpf}`, volunteer, close);
    }

    HandlerAssociate(event){
        debugger;
        const { volunteer, schools } = this.state;
        const { value } = event.target;
        if(value){
            for (const school of schools) {
                if(school.codSchool === parseInt(value, 10)){
                    volunteer.school = school;
                    break;
                }
            }
        } else {
            volunteer.school = new School()
        }
        this.setState({
            volunteer,
            err: {
                invalid: false
            }
        });
    }

    HandlerSubmit(){
        const { volunteer } = this.state;
        const { user } = volunteer;
        if (volunteer.school.codSchool){
            putRequest(`/volunteer/${user.cpf}`, volunteer);
        } else {
            this.setState({
                err: {
                    invalid: true
                }
            })
        }
    }

    isApprovable(){
        const { volunteer, trainings } = this.state;
        const { user } = volunteer;
        return user.status === Status.WAIT_TRAINING && trainings.length && !(trainings.filter(training => training.endOccurrence > new Date().getTime()).length)
    }

    render(){
        const { volunteer, schools, err } = this.state;
        const { close, isOpen } = this.props;
        if(volunteer){
            const { user, school } = volunteer;
            const address = new Address();
            Object.assign(address, user.address);
            return (
                <Modal toggle={close} isOpen={isOpen}>
                    <ModalHeader toggle={close}>{user.name} - <small>{formatter.cpf(user.cpf)}</small></ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md="1">
                                <img src={pic} alt="" className="rounded-circle" width="75px" />
                            </Col>
                            <Col md="2" />
                            <Col>
                                <Row>
                                    <Col>
                                        <Label className="btn btn-info" style={{cursor: 'default'}}>
                                            {Status.translate(user.status)}
                                        </Label>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <strong>Esoclaridade:</strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        { Schooling.translate(volunteer.schooling) } - {volunteer.conclusion ? 'Completo': 'Incompleto'}
                                        {
                                            volunteer.course && <div>
                                                { volunteer.course }
                                            </div>
                                        }
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <strong>Contato:</strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {user.email} / {formatter.phone(user.phone)}
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <strong>Endereço:</strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {address.toString()}
                                    </Col>
                                </Row>
                                <br />
                                <Row>
                                    <Col>
                                        <strong>Avaliações:</strong>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        {
                                            volunteer.ratings.length?
                                                `Avaliação média de ${user.name} é ${volunteer.rating}`: 'Voluntário ainda não foi avaliado'
                                        }
                                    </Col>
                                </Row>
                                <br/>
                                <Row>
                                    <Col>
                                        <Form inline>
                                            <Input id="school" type="select" label="Escola" invalidMessage="O voluntário deve ser associado a uma escola"
                                                onChange={this.HandlerAssociate} value={school? school.codSchool : ''} {...err} required>
                                                <option value="">Selecione</option>
                                                {
                                                    schools.map(school => <option key={school.codSchool} value={school.codSchool}>{school.name}</option>)
                                                }
                                            </Input>
                                            <Button color="primary" type="button" onClick={this.HandlerSubmit}>Associar</Button>
                                        </Form>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter style={{ display: 'inline' }}>
                        <Row>
                            <Col>
                                <Button color="danger" onClick={this.handlerDelete}>Excluir</Button>
                            </Col>
                            <Col>
                                {
                                    this.isApprovable()? (
                                        <Button color="info" className="float-right" onClick={this.handlerAprroved}>Aprovar</Button>
                                    ) : (
                                        <Button color="default" className="float-right" onClick={close}>Fechar</Button>
                                    )
                                }
                            </Col>
                        </Row>
                    </ModalFooter>
                </Modal>
            )
        }
        return (
            <Modal toggle={close} isOpen={isOpen}/>
        );
    }
}