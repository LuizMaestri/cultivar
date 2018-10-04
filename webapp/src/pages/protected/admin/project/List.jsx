import React, { Component, Fragment } from 'react';
import { Project } from '../../../../model';
import { getRequest, postRequest } from '../../../../utils/http';
import { Row, Col, Table, Button, Form } from 'reactstrap';
import { Input, DatePicker } from '../../../../components';
import ListItem from './ListItem.jsx';

export default class extends Component{
    constructor(){
        super();
        this.state ={
            projects: [],
            project: new Project(),
            invalid: false
        }
        this.handlerName = this.handlerName.bind(this);
        this.handlerStart = this.handlerStart.bind(this);
        this.handlerEnd = this.handlerEnd.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerName(event) {
        const { project } = this.state;
        project.name = event.target.value;
        this.setState({ invalid: false, project });
    }

    handlerStart(event) {
        const { project } = this.state;
        const { value } = event.target;
        project.start = value ? new Date(value) : null;
        this.setState({ invalid: false, project });
    }

    handlerEnd(event) {
        const { project } = this.state;
        const { value } = event.target;
        project.end = value ? new Date(value) : null;
        this.setState({ invalid: false, project });
    }

    handlerSubmit() {
        const { project } = this.state;
        if (!project.name || !project.start || !project.end) {
            this.setState({ invalid: true })
            return;
        }
        postRequest(
            '/project',
            project,
            this.componentWillMount
        );
    }

    componentWillMount(){
        getRequest(
            '/project',
            res => this.setState({ projects: res.data })
        );
    }

    render(){
        const { projects, project, invalid } = this.state;
        const { isOpen, close } = this.props;
        const { start } = project;
        const minDateStart = new Date().toJSON().split('T')[0];
        const minDateEnd = start ? start.toJSON().split('T')[0] : minDateStart;
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
                        <Form>
                            <Input id="name" label="Nome do Projeto" onChange={this.handlerName} invalidMessage="Nome do Projeto é Obrigatório" value={project.name} invalid={invalid} required />
                            <DatePicker id="start" label="Início do Projeto" invalidMessage="Início do Projeto é obrigatório" min={minDateStart} onChange={this.handlerStart} invalid={invalid} required />
                            <DatePicker id="end" label="Final do Projeto" invalidMessage="Final do Projeto é obrigatório" min={minDateEnd} onChange={this.handlerEnd} invalid={invalid} required />
                            <Button type="button" color="primary" onClick={this.handlerSubmit}>Cadastrar</Button>
                        </Form>
                    </Col>
                </Row>
            </Fragment>
        )
    }
} 