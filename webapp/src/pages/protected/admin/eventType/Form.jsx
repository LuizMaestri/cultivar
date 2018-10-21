import React, { Component, Fragment } from 'react';
import { EventType, Training } from '../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../utils/http';
import { Row, Col, Button, Form, Card, CardBody } from 'reactstrap';
import { ClipLoader } from 'react-spinners';
import { Input, FileInput, Switch } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            typeEvent: new EventType(),
            files: [],
            loading: false,
            success: false
        };
        this.handlerName = this.handlerName.bind(this);
        this.handlerLinkAttachemnt = this.handlerLinkAttachemnt.bind(this);
        this.handlerUploadAttachemnt = this.handlerUploadAttachemnt.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerIsFile = this.handlerIsFile.bind(this);
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }
    
    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
    }

    handlerName(event){
        const { typeEvent } = this.state;
        typeEvent.name = event.target.value;
        this.setState({ typeEvent });
    }

    handlerAdd() {
        const { typeEvent } = this.state;
        let training = new Training();
        training.isFile = false;
        typeEvent.trainings.push(training);
        this.setState({ typeEvent })
    }

    handlerNameAttachemnt(event, index) {
        const { typeEvent } = this.state;
        typeEvent.trainings[index].name = event.target.value;
        this.setState({ typeEvent });
    }

    handlerLinkAttachemnt(event, index) {
        const { typeEvent } = this.state;
        typeEvent.trainings[index].link = event.target.value;
        this.setState({ typeEvent });
    }

    handlerUploadAttachemnt(event, index) {
        const file = event.target.files[0];
        const { files, typeEvent } = this.state;
        typeEvent.trainings[index].path = file.name;
        files.push(file);
        this.setState({ files, typeEvent  });
    }

    handlerRemove(index) {
        const { typeEvent } = this.state;
        typeEvent.trainings.splice(index, 1);
        this.setState({ typeEvent });
    }

    handlerIsFile(value, index) {
        const { typeEvent } = this.state;
        typeEvent.trainings[index].isFile = value
        this.setState({ typeEvent });
    }

    handlerSubmit(){
        this.setState({ loading: true });
        const { afterSubmit } = this.props;
        const { typeEvent, files } = this.state;
        const json = JSON.stringify(typeEvent);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        let form = new FormData();
        form.append('typeEvent', blob);
        files.forEach( file => form.append('files', file));
        postRequest(
            '/typeEvent',
            form,
            () => {
                afterSubmit();
                this.setState({ typeEvent: new EventType(), loading: false, success: true });
            },
            () => this.setState({ loading: false })
        );
    }

    render(){
        const { typeEvent, loading, success } = this.state;
        const { trainings } = typeEvent;
        return (
            <Card>
                <CardBody>
                    <Form>
                        <Row>
                            <Col>
                                <Input id="name" label="Tipo de Evento" onChange={this.handlerName} invalidMessage="Tipo de Evento é Obrigatório" value={typeEvent.type} required/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <h4>Materiais</h4>
                            </Col>
                        </Row>
                        {
                            trainings.length ?
                                trainings.map(
                                    (training, index) => (
                                        <Fragment key={`training-${index}`}>
                                            <Row>
                                                <Col>
                                                    <Input id={`training-${index}`} label="Nome" invalidMessage="Nome é Obrigatório" value={training.name} onChange={event => this.handlerNameAttachemnt(event, index)} required />
                                                </Col>
                                                <Col md="5">
                                                    <Switch id={`file-${index}`} label="Arquivo pra Upload" value={training.isFile} onChange={value => this.handlerIsFile(value, index)} />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    {
                                                        training.isFile ?
                                                            (
                                                                <Row>
                                                                    <Col md="9">
                                                                        <FileInput id={`upload-${index}`} label="Anexar arquivo" invalidMessage="Upload é Obrigatório" disabled={loading || success || !training.name} onChange={event => this.handlerUploadAttachemnt(event, index)} accept="application/pdf" required />
                                                                    </Col>
                                                                    <Col md="2">
                                                                        <ClipLoader sizeUnit="px" size={30} color="#007bff" loading={loading} />
                                                                    </Col>
                                                                </Row>
                                                            ) : (
                                                                <Input id={`link-${index}`} label="Link" invalidMessage="Link é Obrigatório" value={training.link} onChange={event => this.handlerLinkAttachemnt(event, index)} required />
                                                            )
                                                    }
                                                </Col>
                                                <Col md="3">
                                                    {!training.isFile && <label>&nbsp;</label>}
                                                    <Button outline color="secondary" onClick={() => this.handlerRemove(index)}>Remover</Button>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )
                                ): null
                        }
                        <Row>
                            <Col>
                                <Button outline color="secondary" onClick={this.handlerAdd}>Incluir</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Button type="button" color="primary" className="float-right" onClick={this.handlerSubmit}>Cadastrar</Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}