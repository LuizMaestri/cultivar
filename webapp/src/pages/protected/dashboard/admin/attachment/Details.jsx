import React from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter, Row, Col, Button } from 'reactstrap';
import { Status } from '../../../../../model';

export default ({ close, attachment, isOpen }) => attachment && (
    <Modal toggle={close} isOpen={isOpen}>
        <ModalHeader toggle={close}>{attachment.name}</ModalHeader>
        <ModalBody>
            <Row>
                <Col>
                    <strong>
                        Obrigatório:
                    </strong>
                </Col>
                <Col>
                    {attachment.required ? 'Sim': 'Não'}
                </Col>
            </Row>
            <Row>
                <Col>
                    <strong>
                        Disponibilizado pela CnE:
                    </strong>
                </Col>
                <Col>
                    {attachment.download ? 'Sim': 'Não'}
                </Col>
            </Row>
            <Row>
                <Col>
                    <strong>
                        Necessário envio durante:
                    </strong>
                </Col>
                <Col>
                    {Status.translate(attachment.status)}
                </Col>
            </Row>
        </ModalBody>
        <ModalFooter>
            <Button color="default" type="button" onClick={close}>Fechar</Button>
        </ModalFooter>
    </Modal>
);