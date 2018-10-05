import React, { Component } from 'react';
import { getRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: []
        };
    }

    componentWillMount(){
        getRequest('/attachment', res => this.setState({ attachments: res.data }));
    }

    render(){
        const { attachments} = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>
                            Anexos
                        </h3>
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
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount.bind(this)}/>
                    </Col>
                </Row>
            </div>
        );
    }

}