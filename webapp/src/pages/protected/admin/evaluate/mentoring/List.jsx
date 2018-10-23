import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
           mentorings: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/mentoring', res => this.setState({ mentorings: res.data }));
    }

    handlerDelete(codQuestion){
        deleteRequest(`/mentoring/${codQuestion}`, this.componentWillMount);
    }

    render(){
        const { mentorings } = this.state;
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
                                mentorings.length ?
                                    mentorings.map(
                                        mentoring => 
                                            (
                                                <ListGroupItem key={mentoring.codQuestion}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{mentoring.question}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(mentoring.codQuestion)}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>Nenhuma questão sobre o feedback de evolução do voluntário encontrada</strong>
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