import React, { Component, Fragment } from 'react';
import { getRequest, deleteRequest } from '../../../../../utils/http';
import { Col, Row, ListGroup, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            skills: []
        };
        this.handlerDelete = this.handlerDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/skill', res => this.setState({ skills: res.data }));
    }

    handlerDelete(codSkill){
        deleteRequest(`/skill/${codSkill}`, this.componentWillMount);
    }

    render(){
        const { skills } = this.state;
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
                                skills.length ?
                                    skills.map(
                                        skill => 
                                            (
                                                <ListGroupItem key={skill.codSkill}>
                                                    <Row>
                                                        <Col>
                                                            <strong>{skill.name}</strong>
                                                        </Col>
                                                        <Col md="1">
                                                            <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={() => this.handlerDelete(skill.codSkill)}/>
                                                        </Col>
                                                    </Row>
                                                </ListGroupItem>
                                            )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>Nenhuma questão sobre a Competência encontrada</strong>
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