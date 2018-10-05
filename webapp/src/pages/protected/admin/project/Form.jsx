import React, { Component } from 'react';
import { Project } from '../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../utils/http';
import { Form, Button, Card, CardBody } from 'reactstrap';
import { Input, DatePicker } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            project: new Project(),
            invalid: false
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerStart = this.handlerStart.bind(this);
        this.handlerEnd = this.handlerEnd.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    static propTypes = {
        afterSubmit: PropTypes.func.isRequired
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
        const { afterSubmit } =this.props;
        postRequest(
            '/project',
            project,
            () => {
                afterSubmit();
                this.setState({ project: new Project() });
            }
        );
    }
    render(){
        const { project, invalid } = this.state;
        const { start } = project;
        const minDateStart = new Date().toJSON().split('T')[0];
        const minDateEnd = start ? start.toJSON().split('T')[0] : minDateStart;
        return (
            <Card>
                <CardBody>
                    <Form>
                        <Input id="name" label="Nome do Projeto" onChange={this.handlerName} invalidMessage="Nome do Projeto é Obrigatório" value={project.name} invalid={invalid} required />
                        <DatePicker id="start" label="Início do Projeto" invalidMessage="Início do Projeto é obrigatório" min={minDateStart} onChange={this.handlerStart} invalid={invalid} required />
                        <DatePicker id="end" label="Final do Projeto" invalidMessage="Final do Projeto é obrigatório" min={minDateEnd} onChange={this.handlerEnd} invalid={invalid} required />
                        <Button type="button" color="primary" className="float-right" onClick={this.handlerSubmit}>Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}