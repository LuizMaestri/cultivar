import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { postRequest, getRequest } from '../../../../../../utils/http';
import formatter from '../../../../../../utils/formatter';
import { Event,  School, Training } from '../../../../../../model';
import { Row, Col, Modal, ModalHeader, ModalBody, Button, Label } from 'reactstrap';
import { Wizard, Input, Switch, FileInput } from '../../../../../../components';
import axios from 'axios';
import './form.css';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: props.event,
            volunteers: [],
            schools: [],
            typesEvent: [],
            trainingsOfType: []
        };
        this.handlerType = this.handlerType.bind(this);
        this.handlerCity = this.handlerCity.bind(this);
        this.handlerNeighborhood = this.handlerNeighborhood.bind(this);
        this.handlerStreet = this.handlerStreet.bind(this);
        this.handlerNumber = this.handlerNumber.bind(this);
        this.handlerParticipants = this.handlerParticipants.bind(this);
        this.handlerSelectSchool = this.handlerSelectSchool.bind(this);
        this.handlerAdd = this.handlerAdd.bind(this);
        this.handlerRemove = this.handlerRemove.bind(this);
        this.handlerNameAttachemnt = this.handlerNameAttachemnt.bind(this);
        this.handlerLinkAttachemnt = this.handlerLinkAttachemnt.bind(this);
        this.handlerIsFile = this.handlerIsFile.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
        event: PropTypes.objectOf(Event).isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    }

    componentWillMount(){
        const { event } = this.state;
        event.allDay = event.startOccurrence === event.endOccurrence;
        axios.all([
            getRequest('/school', res => res.data),
            getRequest('/typeEvent', res => res.data)
        ]).then(
            res => this.setState({
                event,
                schools: res[0],
                typesEvent: res[1]
            })
        );
    }

    handlerType(userEvent){
        const { event } = this.state;
        const { value } = userEvent.target;
        event.type = value;
        getRequest(
            `/typeEvent/${value}/trainings`,
            res => this.setState({ trainingsOfType: res.data, event })
        );
    }

    //address
    handlerCity(userEvent) {
        const { event } = this.state;
        const {address } = event;
        address.city = userEvent.target.value;
        event.address = address;
        this.setState({ event });
    }

    handlerNeighborhood(userEvent) {
        const { event } = this.state;
        const {address } = event;
        address.neighborhood = userEvent.target.value;
        event.address = address;
        this.setState({ event });
    }

    handlerStreet(userEvent) {
        const { event } = this.state;
        const {address } = event;
        address.street = userEvent.target.value;
        event.address = address;
        this.setState({ event });
    }

    handlerNumber(userEvent) {
        const { event } = this.state;
        const {address } = event;
        address.number = userEvent.target.value;
        event.address = address;
        this.setState({ event });
    }

    //participants
    handlerSelectSchool(userEvent){
        const { value } = userEvent.target;
        const { event, schools } = this.state
        event.school = new School()
        for(const school of schools){
            if(school.codSchool === parseInt(value, 10)){
                event.school = school;
            }
        }
        if(value){
            axios.all([
                getRequest(
                    `/volunteer?cod_school=${value}`,
                    res => res.data
                ),
                getRequest(
                    `/school/${value}`,
                    res => res.data
                )
            ]).then(
                res => {
                    const school = res[1];
                    event.school = school;
                    event.address = school.address;
                    event.address.codAddress = null;
                    this.setState({volunteers: res[0], event});
                }
            )
        } else{
            this.setState({volunteers: [], event});
        }
    }
    handlerParticipants(userEvent){
        const { event, volunteers } = this.state;
        let participants = [], opt, participant;
        for (let i = 0; !!(opt = userEvent.target.options[i++]);) {
            
            if (opt.selected) {
                for (let j = 0; !!(participant = volunteers[j++].user);){
                    if (opt.value === participant.cpf){
                        participants.push(participant);
                        break;
                    }
                }
            }
        }
        event.participants = participants;
        this.setState({ event });
    }

    handlerAdd(){
        const { event } = this.state;
        let training = new Training();
        training.isFile = false;
        event.trainings.push(training);
        this.setState({event})
    }

    handlerNameAttachemnt(userEvent, index){
        const { event } = this.state;
        event.trainings[index].name = userEvent.target.value;
        this.setState({event});
    }

    handlerLinkAttachemnt(userEvent, index) {
        const { event } = this.state;
        event.trainings[index].link = userEvent.target.value;
        this.setState({ event });
    }

    handlerUploadAttachemnt(userEvent, index){
        const file = userEvent.target.files[0];
        console.log(file);
    }

    handlerRemove(index){
        const { event } = this.state;
        const training = event.trainings[index];
        event.trainings.splice(index, 1);
        this.setState({event});
    }

    handlerIsFile(value, index){
        const { event } = this.state;
        event.trainings[index].isFile = value
        this.setState({ event });
    }

    handlerSubmit(){
        const { afterSubmit } = this.props
        let { event } = this.state;
        const [start, end] = [ event.startOccurrence, event.endOccurrence ] 
        event.startOccurrence = event.startOccurrence.toJSON()
        event.endOccurrence = event.endOccurrence.toJSON()
        postRequest(
            '/event',
            event,
            afterSubmit,
            () => [event.startOccurrence, event.endOccurrence] = [start, end]
        );
    }

    render(){
        const { isOpen, close } = this.props;
        const { event, volunteers, schools, typesEvent, trainingsOfType } = this.state;
        const dateTitle = event.allDay ? 
            event.startOccurrence.toLocaleString() : 
            event.startOccurrence.toLocaleString() + ' - ' + event.endOccurrence.toLocaleString();
        const { codSchool } = event.school;
        console.log(codSchool);
        const { trainings, type, address } = event;
        return (
            <Modal isOpen={isOpen} toggle={close} style={{width: 'max-content'}}>
                <ModalHeader toggle={close}>Novo Evento - {dateTitle}</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3>Dados do evento</h3>
                            <Input id="type" type="select" label="Tipo de Evento" invalidMessage="Tipo de Evento é obrigatório" value={type} onChange={this.handlerType} required >
                                <option value="">Selecione</option>
                                {
                                    typesEvent.map(
                                        typeEvent => <option key={typeEvent.type} value={typeEvent.type}>{typeEvent.name}</option>
                                    )
                                }
                            </Input>
                            <Input id="filter" type="select" label="Escola" value={codSchool} onChange={this.handlerSelectSchool}>
                                <option>Selecione</option>
                                {
                                    schools.map(school => <option key={school.codSchool} value={school.codSchool}>{school.name}</option>)
                                }
                            </Input>
                            <Input id="city" label="Cidade" invalidMessage="Cidade é obrigatório" value={address.city} disabled={!codSchool} onChange={this.handlerCity} required />
                            <Input id="neighborhood" label="Bairro" invalidMessage="Bairro é obrigatório" value={address.neighborhood} disabled={!codSchool} onChange={this.handlerNeighborhood} required />
                            <Row>
                                <Col>
                                    <Input id="street" label="Lougradouro" invalidMessage="Lougradouro é obrigatório" value={address.street} disabled={!codSchool} onChange={this.handlerStreet} required />
                                </Col>
                                <Col md="3">
                                    <Input id="number" label="Número" value={address.number} onChange={this.handlerNumber} disabled={!codSchool} />
                                </Col>
                            </Row>
                            <hr className="row" />
                        </div>
                        <div>
                            <h3>Participantes</h3>
                            <Input id="type" type="select" label="Selecione" invalidMessage="Tipo de Evento é obrigatório" onChange={this.handlerParticipants} style={{ height: '500px'}} multiple required disabled={!codSchool} >
                                {
                                    volunteers.map(
                                        volunteer => {
                                            const { user } = volunteer;
                                            return (
                                                <option key={user.cpf} value={user.cpf}>{formatter.cpf(user.cpf)} - {user.name}</option>
                                            );
                                        }
                                    )
                                }
                            </Input>
                            <hr className="row" />
                        </div>
                        <div>
                            <h3>Materias</h3>
                            {
                                trainingsOfType.length?
                                    trainingsOfType.map(
                                        training => (
                                                <Col key={training.codTraining}>
                                                    {training.link && <a className="btn btn-info" href={training.link} target="_blank">{training.name}</a>}
                                                </Col>
                                            )
                                    ) : (
                                        <div>
                                            <strong>Para esse tipo de evento não há materiais préviamente cadastrados</strong>
                                        </div>
                                    )
                            }
                            <hr className="row" />
                        </div>
                        <div>
                            <h3>Materiais  Extra</h3>
                            {
                                trainings.map((training, index) => (
                                    <Fragment>
                                        <Row>
                                            <Col>
                                                <Input id={`training-${index}`} label="Nome" invalidMessage="Nome é Obrigatório" value={training.name} onChange={event => this.handlerNameAttachemnt(event, index)} required/>
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
                                                            <FileInput id={`upload-${index}`} label="Anexar arquivo" invalidMessage="Upload é Obrigatório" onChange={event => this.handlerUploadAttachemnt(event, index)} accept="application/pdf" required/>
                                                        ) : (
                                                            <Input id={`link-${index}`} label="Link" invalidMessage="Link é Obrigatório" value={training.link} onChange={event => this.handlerLinkAttachemnt(event, index)} required/>
                                                        )
                                                }
                                            </Col>
                                            <Col md="3">
                                                {!training.isFile && <label>&nbsp;</label>}
                                                <Button outline color="secondary" onClick={() => this.handlerRemove(index)}>Remover</Button>
                                            </Col>
                                        </Row>
                                    </Fragment>
                                ))
                            }
                            <Row>
                                <Col>
                                    <Button outline color="secondary" onClick={this.handlerAdd}>Incluir</Button>
                                </Col>
                            </Row>
                            <hr className="row" />
                        </div>
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}