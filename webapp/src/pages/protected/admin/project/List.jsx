import React, { Component, Fragment } from 'react';
import { getRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state ={
            projects: []
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest('/project', res => this.setState({projects: res.data}));
    }

    render(){
        const { projects } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Projetos</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Início</th>
                                    <th>Fim</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.length ?
                                        projects.map(project => <ListItem key={project.codProject} project={project} afterDelete={this.componentWillMount} />):
                                        <tr>
                                            <td colSpan="4">
                                                <strong>Não há Projetos registrados</strong>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
} 