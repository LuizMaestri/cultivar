import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRequest } from '../../../../../utils/http';
import { Address } from '../../../../../model';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';


export default class extends Component{
    constructor(){
        super();
        this.state = {
            eventDetails : null
        }
    }

    static propTypes = {
        code: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { code } = this.props;
        getRequest(
            `/event/${code}`,
            res => {
                let eventDetails  = res.data;
                eventDetails.title = eventDetails.type.name + ' - ' + new Date(eventDetails.startOccurrence).toLocaleString();
                this.setState({ eventDetails });
            }
        );
    }

    render(){
        const { isOpen, close } = this.props;
        const { eventDetails } = this.state;
        if (eventDetails){
            const { address: eventAddress, trainings } = eventDetails;
            const duration = Math.ceil(
                Math.abs(
                    eventDetails.startOccurrence - eventDetails.endOccurrence
                ) / (1000 * 3600)
            );
            const address = new Address();
            Object.assign(address, eventAddress);
            return (
                <Modal toggle={close} isOpen={isOpen} >
                    <ModalHeader toggle={close}>{eventDetails.title}</ModalHeader>
                    <ModalBody>
                        <Row>
                            <Col>
                                <strong>Duração:</strong> {eventDetails.allDay ? 'Dia Inteiro' : duration + ' horas (aproximadamente)'}
                            </Col>
                        </Row>
                        <br />
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
                                <strong>Materiais em anexo:</strong>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    trainings.length ?
                                        (
                                            <Row>
                                                {
                                                    trainings.map(
                                                        training => (
                                                            <Col key={training.codTraining}>
                                                                {training.link && <a className="btn btn-info" href={training.link} target="_blank">{training.name}</a>}
                                                            </Col>
                                                        )
                                                    )
                                                }
                                            </Row>
                                        ) : 'Nenhum anexo para esse evento.'
                                }
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="float-right" onClick={close}>Fechar</Button>
                    </ModalFooter>
                </Modal>
            )
        } else {
            return (
                <Modal toggle={close} isOpen={isOpen} ></Modal>
            );
        }
    }
}