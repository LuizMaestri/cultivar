import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            tasks: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/task', res => this.setState({ personalities: res.data }));
    }

    handlerDelete(codTask){
        deleteRequest(`/task/${codTask}`, this.componentWillMount);
    }

    render(){
        const { tasks } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Feedback do Voluntário</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                tasks.length ?
                                    tasks.map(
                                        task => 
                                            (
                                                <ListGroupItem key={task.codTask}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{task.question}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(task.codTask)}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>Nenhuma questão sobre a personalidade do voluntário encontrada</strong>
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