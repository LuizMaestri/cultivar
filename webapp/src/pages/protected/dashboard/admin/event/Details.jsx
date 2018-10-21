import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Address } from '../../../../../model';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Downloader from './Downloader';


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
                eventDetails.title = eventDetails.type.name + ' - ' + new Date(eventDetails.startOccurrence).toLocaleString();
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
        if (eventDetails){
            const { address: eventAddress, trainings: eventTrainings, participants, type } = eventDetails;
            const { trainings: typeTrainings } = type;
            const trainings = eventTrainings.concat(typeTrainings);
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
                            {
                                participants.map(
                                    participant => (
                                        <Col md="4" style={{marginTop: '20px'}}>
                                            {participant.cpf} - {participant.name}
                                        </Col>
                                    )
                                )
                            }
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
                                                        <Col key={training.codTraining} md="3">
                                                            {training.link && <a className="btn btn-info" href={training.link} target="_blank">{training.name}</a>}
                                                            {training.path && <Downloader codTraining={training.codTraining} name={training.name} />}
                                                        </Col>
                                                    )
                                                )
                                            } 
                                        </Row>
                                    ): 'Nenhum anexo para esse evento.'
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