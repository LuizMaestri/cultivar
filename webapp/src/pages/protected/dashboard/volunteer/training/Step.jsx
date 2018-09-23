import React, { Component } from 'react';
import { Calendar } from '../../../../../components';
import { Row, Col } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import Details from './Details.jsx'
import { getRequest } from '../../../../../utils/http';

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
            isOpenDetails: false,
            codEvent: null
        };
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        getRequest(
            `/volunteer/${cpf}/event/`,
            res => this.setState({ 
                events: mapEvents(res.data),
                isOpenDetails: false,
                codEvent: null
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
            <Row style={{ height: '600px', marginBottom: '1%' }}>
                <Col>
                    <Calendar events={events} onSelectEvent={this.handlerSelectEvent}  defaultView={BigCalendar.Views.WEEK}/>
                    {
                        isOpenDetails ? 
                            <Details code={codEvent} isOpen={isOpenDetails} close={this.closeDetails} afterDelete={this.componentWillMount}/> : 
                            null
                    }
                </Col>
            </Row>
        );
    }
}