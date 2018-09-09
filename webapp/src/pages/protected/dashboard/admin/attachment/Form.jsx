import React, { Component } from 'react';
import { Attachment, Status } from '../../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../../utils/http';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input, FileInput, Switch } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state= {
            attachment: new Attachment(),
            file: null
        };
        this.handlerAttatchment = this.handlerAttatchment.bind(this);
        this.handlerRequired = this.handlerRequired.bind(this);
        this.handlerDownload = this.handlerDownload.bind(this);
        this.handlerStatus = this.handlerStatus.bind(this);
        this.handlerFile = this.handlerFile.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerAttatchment(event){
        const { attachment } = this.state;
        attachment.name = event.target.value;
        this.setState({ attachment });
    }

    handlerRequired(value){
        const { attachment } = this.state;
        attachment.required = value;
        this.setState({ attachment });
    }

    handlerDownload(value){
        const { attachment } = this.state;
        attachment.download = value;
        this.setState({ attachment });
    }

    handlerStatus(event){
        const { attachment } = this.state;
        attachment.status = event.target.value;
        this.setState({ attachment });
    }

    handlerFile(event){
        this.setState({ file: event.target.files[0] });
    }

    handlerSubmit(){
        const { afterSubmit, close } = this.props;
        const { attachment, file } = this.state;
        const json = JSON.stringify(attachment);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        let form = new FormData();
        form.append('attachment', blob);
        if(file){
            form.append('file', file);
        }
        postRequest('/attachment', form, () => {
            afterSubmit();
            close();
        })
    }

    render(){
        const { isOpen, close } = this.props;
        const { attachment } = this.state;
        return (
            <Modal isOpen={isOpen} toggle={close}>
                <ModalHeader toggle={close}>Nova Empresa</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="Cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <Input id="name" label="Anexo" onChange={this.handlerAttatchment} invalidMessage="Anexo é Obrigatório" required/>
                            <Row>
                                <Col md="5">
                                    <Switch id="required" label="Envio Obrigatório " onChange={this.handlerRequired}/>
                                </Col>
                                <Col>
                                    <Switch id="dowload" label="Disponibilizado Pela CnE " onChange={this.handlerDownload}/>
                                </Col>
                            </Row>
                            {
                                attachment.download && <FileInput color="info" label="Upload" onChange={this.handlerFile} accept="application/pdf" required/>
                            }
                            <Input id="status" type="select" label="Enviado Durante" onChange={this.handlerStatus} invalidMessage="Enviado Durante é Obrigatório" required>
                                <option value="">Selecione</option>
                                {
                                    Status.values().map(status => <option key={status} value={status}>{Status.translate(status)}</option>)
                                }
                            </Input>
                            <hr className="row"/>
                        </div>
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}