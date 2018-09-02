import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import EventType from '../../../../../model/eventType';
import { Address } from '../../../../../model';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';


export default class extends Component{
    constructor(){
        super();
        this.state = {
            eventDetails : null
        }
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    static propTypes = {
        code: PropTypes.number.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired,
        afterDelete: PropTypes.func.isRequired, 
    };

    componentWillMount() {
        const { code } = this.props;
        getRequest(
            `/event/${code}`,
            res => {
                let eventDetails  = res.data;
                eventDetails.title = EventType.translate(eventDetails.type) + ' - ' + new Date(eventDetails.startOccurrence).toLocaleString();
                this.setState({ eventDetails });
            }
        );
    }

    handlerDelete() {
        const { code, afterDelete} = this.props;
        deleteRequest(`/event/${code}`, afterDelete);
    }

    render(){
        const { isOpen, close } = this.props;
        const { eventDetails } = this.state;
        console.log(this.state)
        if (eventDetails){
            const { address: eventAddress, trainings, participants } = eventDetails;
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
                                <strong>Participantes:</strong>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {participants.map((participant, index) => JSON.stringify(participant))}
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
                                        trainings.map((training, index) => JSON.stringify(training)) :
                                        'Nenhum anexo para esse evento.'
                                }
                            </Col>
                        </Row>
                    </ModalBody>
                    <ModalFooter style={{display: 'inline'}}>
                        <Row>
                            <Col>
                                <Button color="danger" onClick={this.handlerDelete}>Excluir</Button>
                            </Col>
                            <Col>
                                <Button color="primary" className="float-right" onClick={close}>Fechar</Button>
                            </Col>
                        </Row>
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