import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
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
                    <Col md="2">
                        <Add afterSubmit={this.componentWillMount}/>
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