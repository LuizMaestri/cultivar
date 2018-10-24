import React, { Component } from 'react';
import { Row, Col, Button, Collapse } from 'reactstrap';
import ListPersonality from './personality';
import ListSkill from './skill';
import ListTechnology from './technology';
import ListMentoring from './mentoring';
import ListAcitivity from './activity';

const styleButton = {
    width: '100%'
};

export default class extends Component {
    constructor() {
        super();
        this.state = {
            show: {
                knowledge: false,
                personality: false,
                skill: false,
                mentoring: false,
                activities: false
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

    render() {
        const { role } = this.props;
        const { show } = this.state;
        return (
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('knowledge')}>Conhecimento</Button>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('personality')}>Personalidade do voluntário</Button>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('skill')}>Competências Desenvolvidas</Button>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('mentoring')}>Feedback do Voluntário</Button>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <Button type="button" color="info" style={styleButton} onClick={() => this.changeShow('activities')}>Atividades</Button>
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col>
                            <Collapse isOpen={show.knowledge}>
                                <ListTechnology/>
                            </Collapse>
                            <Collapse isOpen={show.personality}>
                                <ListPersonality/>
                            </Collapse>
                            <Collapse isOpen={show.skill}>
                                <ListSkill/>
                            </Collapse>
                            <Collapse isOpen={show.mentoring}>
                                <ListMentoring/>
                            </Collapse>
                            <Collapse isOpen={show.activities}>
                                <ListAcitivity/>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}