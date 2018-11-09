import React, { Component } from 'react';
import { Calendar } from '../../../../../components';
import { Row, Col, Label } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import Details from './Details'
import Evaluate from './Evaluate'
import { Volunteer } from '../../../../../model';
import { getRequest } from '../../../../../utils/http';
import axios from 'axios';

const mapEvents = 
    events => events.map(
        event =>{
            event.end = new Date(event.endOccurrence);
            event.start = new Date(event.startOccurrence);
            return event
        }
    );

export default class extends Component{
    constructor(){
        super();
        this.state = {
            events: [],
            evaluates: [],
            isOpenDetails: false,
            codEvent: null,
            volunteer: new Volunteer()
        };
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        axios.all([
            getRequest(`/volunteer/${cpf}`, res => res.data),
            getRequest(`/volunteer/${cpf}/event`, res => res.data),
            getRequest(`/volunteer/${cpf}/event/evaluate`, res => res.data),
            getRequest(`/volunteer/${cpf}/project/evaluate`, res => res.data)
        ]).then(
            res => {
                const events = mapEvents(res[1]); 
                const evaluates = mapEvents(res[2])
                    .concat(
                        res[3].map(
                            project => {
                                project.isProject = true;
                                project.title = project.name
                                return project;
                            }
                        )
                    );
                this.setState({
                    volunteer: res[0],
                    isOpenDetails: false,
                    codEvent: null,
                    evaluates,
                    events
                });
            }
        );
    }

    getLabel(){
        const { ratings, rating } = this.state.volunteer;
        const lastRating = ratings[0];
        let className, text;
        if (lastRating){
            if (rating < 40 || lastRating.grade < 40){
                className = 'danger';
            } else if (rating < 70){
                className = 'warning';
            } else {
                className = 'success';
            }
        } else {
            className = 'secondary';
            text = 'Ainda não há avaliações';
        }

        return (
            <Row>
                <Col>
                    <Label className={`btn btn-${className}`} style={{ cursor: 'default', width: 'inherit', height: '40px'}}>
                        {text}
                    </Label>
                </Col>
            </Row>
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
        const { events, isOpenDetails, codEvent, evaluates, volunteer } = this.state;
        const { cpf } = volunteer.user;
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
                <Col md="2">
                    <h3 className="text-center">Avaliações</h3>
                    {this.getLabel()}
                    <br/>
                    {evaluates.length ? evaluates.map(evaluate => <Evaluate evaluate={evaluate} cpf={cpf} afterSubmit={this.componentWillMount}/>) : null}
                </Col>
            </Row>
        );
    }
}