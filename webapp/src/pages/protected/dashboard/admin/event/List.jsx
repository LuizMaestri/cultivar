import React, { Component } from 'react';
import { Calendar } from '../../../../../components';
import { Row, Col } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import FormEvent from './form';
import Details from './Details.jsx'
import Event from '../../../../../model/event';
import { getRequest } from '../../../../../utils/http';
import './list.css'

const mapEvents = 
    events => events.map(
        event =>{
            event.end = new Date(event.endOccurrence);
            event.start = new Date(event.startOccurrence);
            event.title = event.type.name + ' - ' + event.start.toLocaleString()
            return event
        }
    );

export default class extends Component{
    constructor(){
        super();
        this.state = {
            events: [],
            isOpenForm: false,
            isOpenDetails: false,
            newEvent: new Event(),
            codEvent: null
        };
        this.closeForm = this.closeForm.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectSlot = this.handlerSelectSlot.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        const { filterBySchool, filterByVolunteer } = this.props;
        getRequest(
            `/event?cod_cpf=${filterByVolunteer.join(',')}&cod_school=${filterBySchool.join(',')}`,
            res => this.setState({
                events: mapEvents(res.data),
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

    render(){
        const { events, schools, isOpenForm, isOpenDetails, newEvent, codEvent } = this.state;
        return (
            <Row style={{ height: '600px', marginBottom: '1%' }}>
                <Col>
                    <Calendar events={events} onSelectEvent={this.handlerSelectEvent} onSelectSlot={this.handlerSelectSlot} selectable defaultView={BigCalendar.Views.WEEK} />
                    {
                        isOpenForm ?
                            <FormEvent isOpen={isOpenForm} close={this.closeForm} event={newEvent} afterSubmit={this.componentWillMount} /> :
                            null
                    }
                    {
                        isOpenDetails ?
                            <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} afterDelete={this.componentWillMount} /> :
                            null
                    }
                </Col>
            </Row>
        );
    }
}