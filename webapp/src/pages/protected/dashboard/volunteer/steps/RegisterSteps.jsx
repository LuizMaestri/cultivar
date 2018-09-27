import React from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Status } from '../../../../../model';
import { FaUser, FaCheck, FaFileAlt, FaBuilding, FaChalkboard } from 'react-icons/fa';
import Arrow from 'react-arrow'
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
                {successContition ? label.replace('Aguardando ', '') : label}
            </Col>
        </Row>
    </Col>
)


const ArrowStep = ({successContition}) => {
    const color = successContition ? '#28a745' : '#6c757d';
    const style = {
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '2%'
    };
    return (
        <Col md="1" style={style}>
            <Arrow direction="right" shaftWidth={30} shaftLength={80} headWidth={80} headLength={30} fill={color}/>
        </Col>
    )
}

export default ({status}) => (
    <Row style={{ textAlign: 'center' }}>
        <Step userStatus={status} status={Status.REGISTER} icon={<FaUser />} successContition={Status.REGISTER !== status} label="Registro"/>
        <ArrowStep successContition={Status.REGISTER !== status}/>
        <Step userStatus={status} status={Status.WAIT_COMPANY} icon={<FaBuilding/>} successContition={![Status.REGISTER, Status.WAIT_COMPANY].includes(status)} label="Aguardando Recomendação de empresa"/>
        <ArrowStep successContition={![Status.REGISTER, Status.WAIT_COMPANY].includes(status)}/>
        <Step userStatus={status} status={Status.WAIT_STATEMENT} icon={<FaFileAlt/>} successContition={[Status.WAIT_TRAINING, Status.APPROVED].includes(status)} label="Aguardando Envio do Termo de Responsabilidade"/>
        <ArrowStep successContition={[Status.WAIT_TRAINING, Status.APPROVED].includes(status)}/>
        <Step userStatus={status} status={Status.WAIT_TRAINING} icon={<FaChalkboard/>} successContition={Status.APPROVED === status} label="Aguardando Treinamento"/>
        <ArrowStep successContition={Status.APPROVED === status}/>
        <Step userStatus={status} status={Status.APPROVED} icon={<FaCheck/>} successContition={Status.APPROVED === status} label="Aprovado"/>
    </Row>
);