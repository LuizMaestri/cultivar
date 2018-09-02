import React, { Component } from 'react';
import Attachment from '../../../../../model/attachment';
import { getRequest, postRequest, deleteRequest } from '../../../../../utils/http';
import { Row, Col, Form, Button, Table } from 'reactstrap';
import { Input } from '../../../../../components';
import { FaTrash } from 'react-icons/fa';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: [],
            newAttachment: new Attachment(),
            invalid: false
        };
        this.handlerAttatchment = this.handlerAttatchment.bind(this)
        this.handlerRequired = this.handlerRequired.bind(this)
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
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

    handlerDelete(codAttachment) {
        deleteRequest(
            `/attachment/${codAttachment}`,
            () => getRequest(
                '/attachemnt',
                res => this.setState({
                    attachments: res.data
                })
            )
        );
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
        const { attachments } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <Form inline>
                            <Input id="newAttachment" label="Anexo" invalidMessage="Campo Obrigatório" invalid={this.state.invalid} onChange={this.handlerAttatchment} required />
                            <Input id="isREquired" type="checkbox" label="Obrigatório" invalidMessage="Campo Obrigatório" onChange={this.handlerRequired}/>
                            <Button type="button" color="primary" onClick={this.handlerSubmit}>Cadastrar</Button>
                        </Form>
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
                                                <tr key={attachment.codAttachment}>
                                                    <td>
                                                        <strong>
                                                            {attachment.name}
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <strong>
                                                            {attachment.required ? "Sim" : "Não"}
                                                        </strong>
                                                    </td>
                                                    <td>
                                                        <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(attachment.codAttachment)} />
                                                    </td>
                                                </tr>
                                            )
                                        ) : 
                                        (
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