import React, { Component, Fragment } from 'react';
import { EventType, Training } from '../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../utils/http';
import { Row, Col, Button, Form, Card, CardBody } from 'reactstrap';
import { Input, FileInput, Switch } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            typeEvent: new EventType(),
            files: []
        };
        this.handlerName = this.handlerName.bind(this);
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
        /*const training = typeEvent.trainings[index];
        training.name = event.target.value;
        if(training.isFile && files[index]){
            this.upload()
        } else{
            this.setState({ typeEvent });
        }*/
        this.setState({ typeEvent });
    }

    handlerLinkAttachemnt(event, index) {
        const { typeEvent } = this.state;
        typeEvent.trainings[index].link = event.target.value;
        this.setState({ typeEvent });
    }

    handlerUploadAttachemnt(event, index) {
        const file = event.target.files[0];
        console.log(file);

    }

    /*upload(index){
        a
    }*/

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
        const { afterSubmit } = this.props;
        const { typeEvent } = this.state;
        /*const json = JSON.stringify(typeEvent);
        const blob = new Blob([json], {
            type: 'application/json'
        });
        let form = new FormData();
        form.append('typeEvent', blob);
        if(file){
            form.append('file', file);
        }*/
        postRequest('/typeEvent', typeEvent, () => {
            afterSubmit();
            this.setState({ typeEvent: new EventType() });
        })
    }

    render(){
        const { typeEvent } = this.state;
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
                                                                <FileInput id={`upload-${index}`} label="Anexar arquivo" invalidMessage="Upload é Obrigatório" onChange={event => this.handlerUploadAttachemnt(event, index)} accept="application/pdf" required />
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