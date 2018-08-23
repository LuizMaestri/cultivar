import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Status } from '../../../../model';
import { FileInput } from '../../../../components';
import { Row, Col, Card, CardText, CardBody, CardTitle } from 'reactstrap';
import FormData from 'form-data';
import { putRequest } from '../../../../utils/http';
import { saveObject } from '../../../../utils/storage';

export default class extends Component{

    static porpTypes = {
        user : PropTypes.object
    }

    constructor(props){
        super(props);
        this.state = {
            user: props.user
        }
    }

    handlerFileTR(event){
        const { id } = this.props.user;
        const file = event.target.files[0];
        if (file){
            let form = new FormData();
            form.append('file', file);
            putRequest(`/volunteer/${id}/tr`, form, () => {
                const { user } = this.props;
                user.status = Status.WAIT_RECOMMEND;
                saveObject('user', user);
                this.setState({user});
            });
        }
    }

    handlerFileTV(event) {
        const { id } = this.props.user;
        const file = event.target.files[0];
        if (file) {
            let form = new FormData();
            form.append('file', file);
            putRequest(`/volunteer/${id}/tv`, form, () => {
                const { user } = this.props;
                user.status = Status.RECOMMEND;
                saveObject('user', user);
                this.setState({ user });
            });
        }
    }

    render(){
        const { user } = this.state;
        if(user.status === Status.WAIT_TR)
            return (
                <Row>
                    <Col md="6 offset-3">
                        <p className="text-center">
                            <small className="text-danger" style={{width: '100%'}}>O Termo de Responsabilidade ainda não foi submetido.</small>
                        </p>
                        <Row>
                            <Col>
                                <a href="tr.pdf" download="Termo de Responsabilidade.pdf" className="btn btn-info">Termo de Responsabilidade</a>
                            </Col>
                            <Col>
                                <FileInput color="primary" className="float-right" onChange={this.handlerFileTR.bind(this)} label="Submeter a aprovação"/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            );
        else
            return (
                <div>
                    <Row>
                        <Col md={1}></Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle>Status</CardTitle>
                                    {
                                        user.status === Status.WAIT_RECOMMEND && (
                                            <p className="text-info">
                                                Esperando recomendação da empresa
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                            </p>
                                        )
                                    }
                                    {
                                        user.status === Status.WAIT_TV && (
                                            <p className="text-warning">
                                                Esperando submição do Termo de Voluntáriado
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <a href="tv.pdf" download="Termo de Voluntáriado.pdf" class="btn btn-info">Termo de Voluntáriado</a>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <FileInput color="primary" onChange={this.handlerFileTR.bind(this)} label="Submeter a aprovação" />
                                                    </Col>
                                                </Row>
                                            </p>
                                        )
                                    }
                                    { 
                                        user.status === Status.RECOMMEND && (
                                            <p className="text-info">
                                                Esperando Aprovação da Computação na Escola
                                                    <br />
                                                <br />
                                                <br />
                                                <br />
                                            </p>
                                        )
                                    }
                                    {
                                        user.status === Status.APPROVED && (
                                            <p className="text-success">
                                                Aprovado
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                            </p>
                                        )
                                    }
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={1}></Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle></CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={1}></Col>
                        <Col>
                            <Card>
                                <CardBody>
                                    <CardTitle></CardTitle>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md={1}></Col>
                    </Row>
                </div>
            );
    }
}