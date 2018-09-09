import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Status } from '../../../../../model';
import { FaUser, FaCheck, FaFileAlt, FaBuilding, FaChalkboard } from 'react-icons/fa';
import './steps.css';

const Step = ({userStatus, status, icon, successContition, label}) => (
    <Col>
        <Row>
            <Col>
                <Button color={ !successContition ? "primary": 'success'} size="lg" className="btn-circle" disabled={userStatus !== status}>
                    {icon}
                </Button>
            </Col>
        </Row>
        <Row>
            <Col>
                {label}
            </Col>
        </Row>
    </Col>
)


export default ({status}) => (
    <Row style={{ textAlign: 'center' }}>
        <Step userStatus={status} status={Status.REGISTER} icon={<FaUser/>} successContition={status !== Status.REGISTER} label="Registro"/>
        <Step userStatus={status} status={Status.WAIT_COMPANY} icon={<FaBuilding/>} successContition={![Status.REGISTER, Status.WAIT_COMPANY].includes(status)} label="Aguardando Recomendação de empresa"/>
        <Step userStatus={status} status={Status.WAIT_STATEMENT} icon={<FaFileAlt/>} successContition={[Status.WAIT_TRAINING, Status.APPROVED].includes(status)} label="Aguardando Envio do Termo de Responsabilidade"/>
        <Step userStatus={status} status={Status.WAIT_TRAINING} icon={<FaChalkboard/>} successContition={Status.APPROVED === status} label="Aguardando Treinamento"/>
        <Step userStatus={status} status={Status.APPROVED} icon={<FaCheck/>} successContition={Status.APPROVED === status} label="Aprovado"/>
    </Row>
);