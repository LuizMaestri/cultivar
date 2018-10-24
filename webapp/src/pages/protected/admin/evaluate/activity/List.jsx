import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            activities: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/activity', res => this.setState({ personalities: res.data }));
    }

    handlerDelete(codActivity){
        deleteRequest(`/activity/${codActivity}`, this.componentWillMount);
    }

    render(){
        const { activities } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Atividades Auxiliares</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                activities.length ?
                                    activities.map(
                                        activity => 
                                            (
                                                <ListGroupItem key={activity.codActivity}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{activity.name}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(activity.codActivity)}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>Nenhuma atividades auxiliar do voluntário encontrada</strong>
                                        </ListGroupItem>
                                    )

                            }
                        </ListGroup>
                    </Col>
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount}/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}