import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Address  from '../../../../../model/address';
import { getRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import pic from './pic.jpeg';

export default class extends Component {
    constructor(){
        super();
        this.state = {
            company: null
        }
    }
    static propTypes = {
        cnpj: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { cnpj } = this.props; 
        getRequest(`/company/${cnpj}`, res => this.setState({ company: res.data }));
    }

    render() {
        const { isOpen, close } = this.props;
        const { company } = this.state;
        if (company) {
            const address = new Address();
            Object.assign(address, company.address);
            return (
                <Modal toggle={close} isOpen={isOpen} >
                    <ModalHeader toggle={close}>{company.name} - <small>{formatter.cnpj(company.cnpj)}</small></ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col md={1}>
                                <img src={pic} alt="" className="rounded-circle" width="75px" />
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
                                        {address.toString()}
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
                                        {company.responsible.email} / {formatter.phone(company.phone)}
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
                                <div>{company.responsible.name}</div>
                                <small>{formatter.cpf(company.responsible.cpf)}</small>
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={close}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            );
        } else {
            return (
                <Modal toggle={close} isOpen={isOpen} ></Modal>
            );
        }
    }
}