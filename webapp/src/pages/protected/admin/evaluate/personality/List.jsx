import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            personalities: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/personality', res => this.setState({ personalities: res.data }));
    }

    handlerDelete(codQuestion){
        deleteRequest(`/personality/${codQuestion}`, this.componentWillMount);
    }

    render(){
        const { personalities } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Personalidade</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                personalities.length ?
                                    personalities.map(
                                        personality => 
                                            (
                                                <ListGroupItem key={personality.codQuestion}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{personality.question}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{cursor: 'pointer'}} color="red" onClick={() => this.handlerDelete(personality.codQuestion)}/>
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