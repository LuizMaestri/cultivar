import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';
import { Status, Address, Schooling } from '../../../../../model';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Label } from 'reactstrap';
import pic from './pic.jpeg';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer: null,
        };
    }

    componentWillMount(){
        const { cpf } = this.props;
        getRequest(`/volunteer/${cpf}`, res => this.setState({volunteer: res.data}));
    }

    render(){
        const { volunteer } = this.state;
        const { close, isOpen } = this.props;
        if(volunteer){
            const { user } = volunteer;
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
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" className="float-right" onClick={close}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            )
        }
        return (
            <Modal toggle={close} isOpen={isOpen}/>
        );
    }
}