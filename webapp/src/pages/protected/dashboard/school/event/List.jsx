import React, { Component } from 'react';
import { Calendar } from '../../../../../components';
import BigCalendar from 'react-big-calendar';
import Details from './Details.jsx'
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
            <div style={{ height: '750px', marginBottom: '1%' }}>
                    <Calendar events={events} onSelectEvent={this.handlerSelectEvent}  defaultView={BigCalendar.Views.WEEK}/>
                    { isOpenDetails && <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} />}
            </div>
        );
    }
}