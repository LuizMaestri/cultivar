import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button, Collapse } from 'reactstrap';
import ListAttachment from './attachment';
import ListQuestion from './question';
import ListEventType from './eventType';
import ListProject from './project';
import EvaluatePage from './evaluate';
import { Roles } from '../../../model';

const styleButton = {
    width: '100%'
};

export default class extends Component{
    constructor(){
        super();
        this.state = {
            show: {
                project: false,
                eventType: false,
                attachment: false,
                question: false,
                evaluate: false
            }
        };
    }

    changeShow(collapse) {
        const { show } = this.state;
        for (const key in show) {
            if (show.hasOwnProperty(key)) {
                show[key] = key === collapse ? !show[key] : false;
            }
        }
        this.setState({ show })
    }
    
    render(){
        const { role, logged } = this.props;
        const { show } = this.state;
        if (role === Roles.ADMIN) {
            return (
                <Row>
                    <Col md="1" />
                    <Col>
                        <Row>
                            <Col>
                                <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('project')}>Projetos</Button>
                            </Col>
                            <Col md="1" />
                            <Col>
                                <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('eventType')}>Tipos de Evento</Button>
                            </Col>
                            <Col md="1" />
                            <Col>
                                <Button type="button" color="info" style={styleButton} onClick={()=>this.changeShow('attachment')}>Anexos</Button>
                            </Col>
                            <Col md="1" />
                            <Col>
                                <Button type="button" color="info" style={styleButton} onClick={()=>this.changeShow('question')}>Questões</Button>
                            </Col>
                            <Col md="1" />
                            <Col>
                                <Button type="button" color="info" style={styleButton} onClick={()=>this.changeShow('evaluate')}>Avaliação</Button>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Collapse isOpen={show.project}>
                                    <ListProject />
                                </Collapse>
                                <Collapse isOpen={show.eventType}>
                                    <ListEventType />
                                </Collapse>
                                <Collapse isOpen={show.attachment}>
                                    <ListAttachment />
                                </Collapse>
                                <Collapse isOpen={show.question}>
                                    <ListQuestion />
                                </Collapse>
                                <Collapse isOpen={show.evaluate}>
                                    <EvaluatePage/>
                                </Collapse>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="1" />
                </Row>
            );
        }
        if(logged){
            return <Redirect to="/dashboard" />
        }
        return <Redirect to="/login" />
    }
}