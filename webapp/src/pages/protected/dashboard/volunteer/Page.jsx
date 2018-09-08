import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import RegisterSteps from './steps';
import Register from './register';
import Company from './company';
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
        this.completeRegistration = this.completeRegistration.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        axios.all([
            getRequest(`/volunteer/${cpf}`, res => res.data),
            getRequest('/attachment', res => res.data)
        ]).then(
            res => this.setState({
                volunteer: res[0],
                attachments: res[1],
                dispatches: res[1].map(attachment => {
                    return {
                        codAttachment: attachment.codAttachment,
                        required: attachment.required,
                        send: false
                    }
                })
            })
        );        
    }

    completeRegistration(codAttachment){
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
        }
        if (conclude){
            const confirm = window.confirm('Todos os anexo obrigatórios já foram submetidos, deseja finalizar seu cadastro?');
            if (confirm){
                volunteer.user.status = Status.WAIT_COMPANY;
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
                            {user.status === Status.REGISTER ? <Register cpf={user.cpf} afterUpload={this.completeRegistration}/>: null}
                            {user.status === Status.WAIT_COMPANY ? <Company cnpj={company.cnpj}/>: null}
                        </Col>
                    </Row>
                </Col>
                <Col md="1"/>
            </Row>
        );
    }
} 