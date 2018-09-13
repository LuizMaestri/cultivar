import React, { Component, Fragment } from 'react';
import { Calendar } from '../../../../../components';
import BigCalendar from 'react-big-calendar';
import Details from './Details.jsx'
import { EventType, Volunteer } from '../../../../../model';
import { getRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            events: [],
            isOpenDetails: false,
            codEvent: null
        };
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
    }

    componentWillMount(){
        const { codSchool } = this.props;
        getRequest(
            `/school/${codSchool}/event`,
            res => this.setState({
                events: res.data.map(
                    event => {
                        event.end = new Date(event.endOccurrence);
                        event.start = new Date(event.startOccurrence);
                        event.title = EventType.translate(event.type) + ' - ' + event.start.toLocaleString()
                        return event
                    }
                )
            })
        );
    }

    closeDetails(){
        this.setState({ isOpenDetails: false, codEvent: null });
    }

    handlerSelectEvent(event){
        const { codEvent } = event
        this.setState({ isOpenDetails: true, codEvent });
    }

    render(){
        const { events, isOpenDetails,  codEvent } = this.state;
        return (
            <Fragment style={{ marginBottom: '1%' }}>
                    <Calendar events={events} onSelectEvent={this.handlerSelectEvent}  defaultView={BigCalendar.Views.WEEK}/>
                    { isOpenDetails && <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} />}
            </Fragment>
        );
    }
}