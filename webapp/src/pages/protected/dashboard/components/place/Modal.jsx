import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { Address } from '../../../../../model';
import formatter from '../../../../../utils/formatter';
import PropTypes from 'prop-types';
import pic from './pic.jpeg';

export default class PlaceModal extends Component{
    static propTypes = {
        element: PropTypes.object.isRequired,
        isOpen: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired
    };

    render(){
        const { element, isOpen, toggle} = this.props;
        return(
            <Modal toggle={() => toggle()} isOpen={isOpen} >
                <ModalHeader toggle={() => toggle()}>{element.name} - <small>{formatter.cnpj(element.id)}</small></ModalHeader>
                <ModalBody>
                    <Row>
                        <Col md={1}>
                            <img src={pic} className="rounded-circle" width="75px"/>
                        </Col>
                        <Col md="2" />
                        <Col>
                            <Row>
                                
                                <Col>
                                    <strong>Endereço:</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {new Address(element.address).toString()}
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <strong>Contato:</strong>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    {element.responsible.email} / {formatter.phone(element.phone)}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col md="3" />
                        <Col>
                            <strong>Responsável:</strong>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="3" />
                        <Col>
                            <div>{element.responsible.name}</div>
                            <small>{formatter.cpf(element.responsible.id)}</small>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => toggle()}>Fechar</Button>
                </ModalFooter>
            </Modal>
        );
    }    
}