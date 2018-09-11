import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import RegisterSteps from './steps';
import Register from './register';
import Company from './company';
import Statement from './statement';
import { Volunteer, Status } from '../../../../model';
import { getRequest, putRequest } from '../../../../utils/http';
import axios from "axios";

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer: new Volunteer(),
            attachments: [],
            dispatches: []
        };
        this.completeUpload = this.completeUpload.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        getRequest(`/volunteer/${cpf}`, resVolunteer => {
            const volunteer = resVolunteer.data;
            const { user, dispatches } = volunteer;
            getRequest(
                `/attachment/${user.status}`,
                res => {
                    const attachments = res.data;
                    dispatches.push(
                        ...(
                            attachments.map(
                                attachment => {
                                    return {
                                        codAttachment: attachment.codAttachment,
                                        required: attachment.required,
                                        send: false
                                    }
                                }
                            )
                        )
                    )
                    this.setState({
                        volunteer,
                        attachments,
                        dispatches 
                    });
                }
            );
        });        
    }

    completeUpload(codAttachment){
        let conclude = true
        const { dispatches, volunteer } = this.state;
        for (const dispatch of dispatches) {
            if (dispatch.codAttachment === codAttachment){
                dispatch.send = true
            }
        }
        for (const dispatch of dispatches) {
            conclude = dispatch.send || !dispatch.required
            if(!conclude){
                break;
            }
        };
        if (conclude){
            const confirm = window.confirm('Todos os anexo obrigatórios já foram submetidos, deseja finalizar esta etapa?');
            if (confirm){
                const { status } = volunteer.user;
                volunteer.user.status = Status.next(status);
                putRequest(
                    `/volunteer/${volunteer.user.cpf}`,
                    volunteer,
                    res => this.setState({volunteer, dispatches})
                );
            }
        } else {
            this.setState({ dispatches });
        }
    }

    render(){
        const { volunteer } = this.state;
        const { user, company } = volunteer;
        return (
            <Row>
                <Col md="1"/>
                <Col>
                    <Row>
                        <Col>
                            <RegisterSteps status={user.status}/>
                            <br/>
                            {user.status === Status.REGISTER && <Register cpf={user.cpf} afterUpload={this.completeUpload}/>}
                            {user.status === Status.WAIT_COMPANY && <Company cnpj={company.cnpj}/>}
                            {user.status === Status.WAIT_STATEMENT && <Statement cpf={user.cpf} afterUpload={this.completeUpload}/>}
                        </Col>
                    </Row>
                </Col>
                <Col md="1"/>
            </Row>
        );
    }
} 