import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            technologies: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/technology', res => this.setState({ technologies: res.data }));
    }

    handlerDelete(codTechnology){
        deleteRequest(`/technology/${codTechnology}`, this.componentWillMount);
    }

    render(){
        const { technologies } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Competências</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                technologies.length ?
                                    technologies.map(
                                        technology => 
                                            (
                                                <ListGroupItem key={technology.codTechnology}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{technology.name}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(technology.codTechnology)}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>Nenhum tipo de Conhecimento encontrado</strong>
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