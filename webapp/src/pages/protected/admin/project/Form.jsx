import React, { Component } from 'react';
import { Project } from '../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../utils/http';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input, DatePicker } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            project: new Project(),
            invalid: false
        }
        this.handlerName = this.handlerName.bind(this);
        this.handlerStart = this.handlerStart.bind(this);
        this.handlerEnd = this.handlerEnd.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
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

    handlerSubmit(){
        const { project } = this.state;
        if (!project.name || !project.start || !project.end){
            this.setState({ invalid: true })
            return;
        }
        const { afterSubmit, close } = this.props;
        postRequest(
            '/project',
            project,
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { project, invalid } = this.state;
        const { isOpen, close } = this.props;
        const { start } = project;
        const minDateStart = new Date().toJSON().split('T')[0];
        const minDateEnd = start ? start.toJSON().split('T')[0] : minDateStart;
        return (
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>Novo Tipo de Evento</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="Cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <Input id="name" label="Nome do Projeto" onChange={this.handlerName} invalidMessage="Nome do Projeto é Obrigatório" value={project.name} invalid={invalid} required />
                            <DatePicker id="start" label="Início do Projeto" invalidMessage="Início do Projeto é obrigatório" min={minDateStart} onChange={this.handlerStart} invalid={invalid} required />
                            <DatePicker id="end" label="Final do Projeto" invalidMessage="Final do Projeto é obrigatório" min={minDateEnd} onChange={this.handlerEnd} invalid={invalid} required />
                            <hr className="row"/>
                        </div>
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}