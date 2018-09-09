import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Address, SchoolType }  from '../../../../../model';
import { getRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import pic from './pic.jpeg';

export default class extends Component {
    constructor(){
        super();
        this.state = {
            school: null
        }
    }
    static propTypes = {
        code: PropTypes.string.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    };

    componentWillMount() {
        const { code } = this.props; 
        getRequest(`/school/${code}`, res => this.setState({ school: res.data }));
    }

    render() {
        const { isOpen, close } = this.props;
        const { school } = this.state;
        if (school) {
            const address = new Address();
            Object.assign(address, school.address);
            return (
                <Modal toggle={close} isOpen={isOpen} >
                    <ModalHeader toggle={close}>
                        <Row>
                            <Col>
                                {school.name}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <small>
                                    <strong>Escola {SchoolType.translate(school.type)}</strong>
                                </small>
                            </Col>
                        </Row>
                    </ModalHeader>
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
                                        {school.responsible.email} / {formatter.phone(school.phone)}
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
                                <div>{school.responsible.name}</div>
                                <small>{formatter.cpf(school.responsible.cpf)}</small>
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