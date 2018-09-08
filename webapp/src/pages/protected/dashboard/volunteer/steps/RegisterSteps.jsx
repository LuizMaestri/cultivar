import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Status } from '../../../../../model';
import { FaUser, FaCheck, FaFileAlt, FaBuilding, FaChalkboard } from 'react-icons/fa';
import './steps.css';

export default ({status}) => (
    <Row style={{ textAlign: 'center' }}>
        <Col>
            <Row>
                <Col>
                    <Button color="primary" size="lg" className="btn-circle" disabled={status !== Status.REGISTER}>
                        <FaUser/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Registro
                </Col>
            </Row>
        </Col>
        <Col>
            <Row>
                <Col>
                    <Button color="primary" size="lg" className="btn-circle" disabled={status !== Status.WAIT_COMPANY}>
                        <FaBuilding/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Aguardando Recomendação de empresa
                </Col>
            </Row>
        </Col>
        <Col>
            <Row>
                <Col>
                    <Button color="primary" size="lg" className="btn-circle" disabled={status !== Status.WAIT_STATEMENT}>
                        <FaFileAlt/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Aguardando Envio do Termo de Responsabilidade
                </Col>
            </Row>
        </Col>
        <Col>
            <Row>
                <Col>
                    <Button color="primary" size="lg" className="btn-circle" disabled={status !== Status.WAIT_TRAINING}>
                        <FaChalkboard/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Aguardando Treinamento
                </Col>
            </Row>
        </Col>
        <Col>
            <Row>
                <Col>
                    <Button color="primary" size="lg" className="btn-circle" disabled={status !== Status.APPROVED}>
                        <FaCheck />
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    Aprovado
                </Col>
            </Row>
        </Col>
    </Row>
);