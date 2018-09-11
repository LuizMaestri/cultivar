import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postRequest, getRequest } from '../../../../../../utils/http';
import formatter from '../../../../../../utils/formatter';
import { Event, EventType, School } from '../../../../../../model';
import { Row, Col, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard, Input } from '../../../../../../components';
import './form.css';

export default class extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: props.event,
            volunteers: [],
            schools: []
        };
        this.handlerType = this.handlerType.bind(this);
        this.handlerCity = this.handlerCity.bind(this);
        this.handlerNeighborhood = this.handlerNeighborhood.bind(this);
        this.handlerStreet = this.handlerStreet.bind(this);
        this.handlerNumber = this.handlerNumber.bind(this);
        this.handlerParticipants = this.handlerParticipants.bind(this);
        this.handlerSelectSchool = this.handlerSelectSchool.bind(this);
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
        getRequest('/school', res => this.setState({
                event,
                schools: res.data
        }));
    }

    handlerType(userEvent){
        const { event } = this.state;
        event.type = userEvent.target.value;
        this.setState({ event });
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
            getRequest(
                `/volunteer?cod_school=${value}`,
                res => this.setState({volunteers: res.data, event})
            );
        } else{
            this.setState({volunteers: [], event});
        }
    }
    handlerParticipants(userEvent){
        const { event, volunteers } = this.state;
        let participants = [], opt, participant;

        for (let i = 0; !!(opt = userEvent.target.options[i++]);) {
            if (opt.selected) {
                for (let j = 0; !!(participant = volunteers[j++]);)
                if (opt.value === participant.cpf){
                    participants.push(participant);
                    break;
                }
            }
        }
        event.participants = participants;
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
        const { event, volunteers, schools } = this.state;
        const dateTitle = event.allDay ? 
            event.startOccurrence.toLocaleString() : 
            event.startOccurrence.toLocaleString() + ' - ' + event.endOccurrence.toLocaleString();
        const { codSchool } = event.school;
        return (
            <Modal isOpen={isOpen} toggle={close} style={{width: 'max-content'}}>
                <ModalHeader toggle={close}>Novo Evento - {dateTitle}</ModalHeader>
                <ModalBody>
                    <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3>Dados do evento</h3>
                            <Input id="type" type="select" label="Tipo de Evento" invalidMessage="Tipo de Evento é obrigatório" onChange={this.handlerType} required >
                                <option value="">Selecione</option>
                                {
                                    EventType.values()
                                    .map(
                                        type => <option key={type} value={type}>{EventType.translate(type)}</option>
                                    )
                                }
                            </Input>
                            <Input id="city" label="Cidade" invalidMessage="Cidade é obrigatório" onChange={this.handlerCity} required />
                            <Input id="neighborhood" label="Bairro" invalidMessage="Bairro é obrigatório" onChange={this.handlerNeighborhood} required />
                            <Row>
                                <Col>
                                    <Input id="street" label="Lougradouro" invalidMessage="Lougradouro é obrigatório" onChange={this.handlerStreet} required />
                                </Col>
                                <Col md="3">
                                    <Input id="number" label="Número" onChange={this.handlerNumber} />
                                </Col>
                            </Row>
                            <hr className="row" />
                        </div>
                        <div>
                            <h3>Participantes</h3>
                            <Input id="filter" type="select" label="Escola" onChange={this.handlerSelectSchool}>
                                <option>Selecione</option>
                                {
                                    schools.map(school => <option key={school.codSchool} value={school.codSchool}>{school.name}</option>)
                                }
                            </Input>
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
                    </Wizard>
                </ModalBody>
            </Modal>
        );
    }
}