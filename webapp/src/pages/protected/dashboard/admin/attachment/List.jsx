import React, { Component } from 'react';
import Attachment from '../../../../../model/attachment';
import { getRequest, postRequest } from '../../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: [],
            invalid: false
        };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.handlerAttatchment = this.handlerAttatchment.bind(this)
        this.handlerRequired = this.handlerRequired.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentWillMount(){
        getRequest('/attachment', res => this.setState({ attachments: res.data }));
    }

    handlerAttatchment(event){
        const { newAttachment } = this.state;
        newAttachment.name = event.target.value;
        this.setState({ newAttachment });
    }

    handlerRequired(){
        const { newAttachment } = this.state;
        newAttachment.required = !newAttachment.required;
        this.setState({ newAttachment });
    }

    handlerSubmit(){
        const { newAttachment } = this.state;
        if (!newAttachment.name) {
            this.setState({ invalid: true })
            return;
        }
        postRequest(
            '/attachment',
            newAttachment,
            () =>
                getRequest(
                    '/attachment',
                    res => this.setState({
                        attachments: res.data,
                        newAttachment: new Attachment()
                    })
                )
        );
    }

    render(){
        const { attachments, newAttachment } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>
                            Anexos
                        </h3>
                    </Col>
                    <Col md="2">
                        <Add afterSubmit={this.componentWillMount.bind(this)}/>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Obrigatório</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attachments.length ? 
                                        attachments.map(
                                            attachment => (
                                                <ListItem key={attachment.codAttachment} attachment={attachment} afterDelete={this.componentWillMount}/>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    <strong>
                                                        Nenhum Registro encontrado
                                                    </strong>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

}