import React, { Component } from 'react';
import { Calendar } from '../../../../../components';
import BigCalendar from 'react-big-calendar';
import Form from './form';
import Details from './Details.jsx'
import Event from '../../../../../model/event';
import EventType from '../../../../../model/eventType';
import { getRequest } from '../../../../../utils/http';
import './list.css'

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
        getRequest(
            '/event',
            res => this.setState({ 
                events: res.data.map(event =>{
                    event.end = new Date(event.endOccurrence);
                    event.start = new Date(event.startOccurrence);
                    event.title = EventType.translate(event.type) + ' - ' + event.start.toLocaleString()
                    return event
                }),
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
         const { newEvent } = this.state;
         newEvent.startOccurrence = start;
         newEvent.endOccurrence = end;
         this.setState({isOpenForm: true, newEvent});
    }

    handlerSelectEvent(event){
        const { codEvent } = event
        this.setState({ isOpenDetails: true, codEvent  });
    }

    render(){
        const { events, isOpenForm, isOpenDetails, newEvent, codEvent } = this.state;
        return (
            <div style={{ height: '100%'}}>
                <Calendar events={events} onSelectEvent={this.handlerSelectEvent} onSelectSlot={this.handlerSelectSlot} selectable defaultView={BigCalendar.Views.WEEK}/>
                {
                    isOpenForm ? 
                        <Form isOpen={isOpenForm} close={this.closeForm} event={newEvent} afterSubmit={this.componentWillMount}/> :
                        null
                }
                {
                    isOpenDetails ? 
                        <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} afterDelete={this.componentWillMount}/> : 
                        null
                }
            </div>
        );
    }
}