import React, { Component } from 'react';
import { Calendar, Input } from '../../../../../components';
import { Form, Row, Col } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import FormEvent from './form';
import Details from './Details.jsx'
import Event from '../../../../../model/event';
import EventType from '../../../../../model/eventType';
import { getRequest } from '../../../../../utils/http';
import axios from 'axios';
import './list.css'

const mapEvents = 
    events => events.map(
        event =>{
            event.end = new Date(event.endOccurrence);
            event.start = new Date(event.startOccurrence);
            event.title = EventType.translate(event.type) + ' - ' + event.start.toLocaleString()
            return event
        }
    );

export default class extends Component{
    constructor(){
        super();
        this.state = {
            events: [],
            schools: [],
            isOpenForm: false,
            isOpenDetails: false,
            newEvent: new Event(),
            codEvent: null
        };
        this.closeForm = this.closeForm.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectSlot = this.handlerSelectSlot.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
        this.handlerSelectSchool = this.handlerSelectSchool.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        axios.all([
            getRequest('/event', res => res.data),
            getRequest('/school', res => res.data)
        ]).then(
            res => this.setState({ 
                events: mapEvents(res[0]),
                schools: res[1],
                isOpenForm: false,
                newEvent: new Event(),
                isOpenDetails: false,
                codEvent: null
            })
        );
    }

    closeForm(){
        this.setState({isOpenForm: false, newEvent: new Event()});
    }

    closeDetails(){
        this.setState({ isOpenDetails: false, codEvent: null });
    }

    handlerSelectSlot({ start, end }){
        if(start < new Date()){
            return;
        }
        const { newEvent } = this.state;
        newEvent.startOccurrence = start;
        newEvent.endOccurrence = end;
        this.setState({isOpenForm: true, newEvent});
    }

    handlerSelectEvent(event){
        const { codEvent } = event
        this.setState({ isOpenDetails: true, codEvent });
    }

    handlerSelectSchool(event){
        let url = '/event';
        const { value } = event.target;
        if(value){
            url += `?cod_school=${value}`;
        }
        getRequest(url, res => this.setState({events: mapEvents(res.data)}));
    }

    render(){
        const { events, schools, isOpenForm, isOpenDetails, newEvent, codEvent } = this.state;
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Form inline>
                                <Input id="filter" type="select" label="Escola" onChange={this.handlerSelectSchool}>
                                    <option value="">Selecione</option>
                                    {
                                        schools.map(school => <option key={school.codSchool} value={school.codSchool}>{school.name}</option>)
                                    }
                                </Input>
                            </Form>
                        </Col>
                    </Row>
                    <br/>
                    <Row>
                        <Col>
                            <Calendar events={events} onSelectEvent={this.handlerSelectEvent} onSelectSlot={this.handlerSelectSlot} selectable defaultView={BigCalendar.Views.WEEK}/>
                            {
                                isOpenForm ? 
                                    <FormEvent isOpen={isOpenForm} close={this.closeForm} event={newEvent} afterSubmit={this.componentWillMount}/> :
                                    null
                            }
                            {
                                isOpenDetails ? 
                                    <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} afterDelete={this.componentWillMount}/> : 
                                    null
                            }
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}