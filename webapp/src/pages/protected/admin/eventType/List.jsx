import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            typesEvent: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest(
            '/typeEvent',
            res => this.setState({ typesEvent: res.data })
        );
    }

    render(){
        const { typesEvent } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Tipo de Eventos</h3>
                    </Col>
                    <Col md="1">
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
                                    <th>Anexos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    typesEvent.length?
                                        typesEvent.map(
                                            typeEvent => (
                                                <ListItem key={typeEvent.type} typeEvent={typeEvent} afterDelete={this.componentWillMount}/>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    <strong>Nenhum Tipo de Evento cadastrado</strong>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}