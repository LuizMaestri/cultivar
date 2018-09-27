import React, { Component } from 'react';
import { Calendar, Input } from '../../../../../components';
import { Row, Col, Form } from 'reactstrap';
import BigCalendar from 'react-big-calendar';
import FormEvent from './form';
import Details from './Details.jsx'
import { Event } from '../../../../../model';
import { getRequest } from '../../../../../utils/http';
import axios from 'axios';
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
            projects: [],
            isOpenForm: false,
            isOpenDetails: false,
            newEvent: new Event(),
            codEvent: null,
            codProject: ''
        };
        this.closeForm = this.closeForm.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.handlerSelectSlot = this.handlerSelectSlot.bind(this);
        this.handlerSelectEvent = this.handlerSelectEvent.bind(this);
        this.handlerSelectProject = this.handlerSelectProject.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        const { filterBySchool, filterByVolunteer } = this.props;
        axios.all([
            getRequest(
                `/event?cod_cpf=${filterByVolunteer.join(',')}&cod_school=${filterBySchool.join(',')}`,
                res => res.data
            ),
            getRequest('/project', res => res.data)
        ]).then(
            res => this.setState({
                events: mapEvents(res[0]),
                projects: res[1],
                isOpenForm: false,
                newEvent: new Event(),
                isOpenDetails: false,
                codEvent: null
            })
        )
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

    handlerSelectProject(event){
        const { value } = event.target;
        const { filterBySchool, filterByVolunteer } = this.props;
        getRequest(
            `/event?cod_cpf=${filterByVolunteer.join(',')}&cod_school=${filterBySchool.join(',')}&cod_project=${value}`,
            res => this.setState({ events: mapEvents(res.data), codProject: value})
        );
    }

    render(){
        const { events, projects, isOpenForm, isOpenDetails, newEvent, codEvent, codProject } = this.state;
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Form inline>
                                <Input id="filter" type="select" value={codProject} label="Projeto:" onChange={this.handlerSelectProject}>
                                    <option value="">Selecione</option>
                                    {
                                        projects.map(project => <option key={project.codProject} value={project.codProject}>{project.name}</option>)
                                    }
                                </Input>
                            </Form>
                        </Col>
                    </Row>
                    <br />
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
                </Col>
            </Row>
        );
    }
}