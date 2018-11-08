import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Wizard, Switch } from '../../../../../components';
import { getRequest, putRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';
import { Roles, Answer, Status } from '../../../../../model';
import Downloader from './Downloader';
import axios from 'axios';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer : null,
            questions: [],
            answers: [],
            volunterAnswers: []
        };
        this.handlerAnswer = this.handlerAnswer.bind(this);
        this.handlerAnswerComment = this.handlerAnswerComment.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props;
        axios.all([
            getRequest(`/volunteer/${cpf}`, res => res.data),
            getRequest(`/question/${Roles.COMPANY_ADMIN}`, res => res.data)
        ]).then(res => {
            this.setState({ 
                volunteer: res[0],
                questions: res[1],
                answers: res[1].map(question => new Answer(question)),
                volunterAnswers: res[0].answers
            });
        });
    }

    handlerAnswer(value, codQuestion) {
        const { answers } = this.state;
        for (const answer of answers) {
            if (answer.question.codQuestion === codQuestion) {
                answer.answer = value;
                break;
            }
        }
        this.setState({ answers });
    }

    handlerAnswerComment(event, codQuestion) {
        const { answers } = this.state;
        for (const answer of answers) {
            if (answer.question.codQuestion === codQuestion) {
                answer.comment = event.target.value;
                break;
            }
        }
        this.setState({ answers });
    }

    handlerSubmit(){
        const { volunteer, answers, volunterAnswers } = this.state;
        const { user, company } = volunteer;
        const { afterSubmit } = this.props;
        user.status = Status.WAIT_STATEMENT;
        volunteer.user = user;
        volunteer.answers.push(...answers);
        putRequest(
            `/volunteer/${user.cpf}`,
            volunteer,
            () => afterSubmit(company),
            () =>{
                user.status = Status.WAIT_COMPANY;
                volunteer.answers = volunterAnswers;
                volunteer.user = user;
                this.setState({volunteer});
            }
        );
    }

    render(){
        const { volunteer, questions } = this.state;
        const { close, isOpen } = this.props;
        if(volunteer){
            const { user, answers, dispatches } = volunteer;
            return (
                <Modal toggle={close} isOpen={isOpen} >
                    <ModalHeader toggle={close}>
                        {user.name} -
                        <small>
                            {formatter.cpf(user.cpf)}
                        </small>
                    </ModalHeader>
                    <ModalBody>
                        <Wizard onCancel={close} submitLabel="Recomendar" onSubmit={this.handlerSubmit}>
                            <div>
                                <h3>Documentos Fornecidos pelo voluntário</h3>
                                <Row>
                                    {
                                        dispatches.filter(dispatch => dispatch.send)
                                            .map(
                                                dispatch => {
                                                    const { attachment } = dispatch;
                                                    return (
                                                        <Col md="3">
                                                            <Downloader name={attachment.name} cpf={user.cpf} codAttachment={attachment.codAttachment}/>
                                                        </Col>
                                                    );
                                                }
                                            )
                                    }
                                </Row>
                                <hr className="row"/>
                            </div>
                            <div>
                                <h3>Respostas Fornecidas pelo voluntário</h3>
                                {
                                    answers.map((answer, index) => (
                                            <div key={answer.question.codQuestion}>
                                                <Row >
                                                    <Col>
                                                        <strong>{answer.question.question}</strong>
                                                    </Col>
                                                    <Col md="2">
                                                        <Switch id={`question-${answer.question.codQuestion}`} label="Resposta" value={answer.answer} disabled />
                                                    </Col>
                                                    <Col>
                                                        <textarea id={`details-${answer.question.codQuestion}`} cols="30" rows="3" value={answer.comment} disabled />
                                                    </Col>
                                                </Row>
                                                {index !== answer.length - 1 ? <hr /> : null}
                                            </div>
                                        ))
                                }
                                <hr/>
                            </div>
                            <div>
                                {
                                    questions.map((question, index) => (
                                        <div key={question.codQuestion}>
                                            <Row >
                                                <Col>
                                                    <strong>{question.question}</strong>
                                                </Col>
                                                <Col md="2">
                                                    <Switch id={`question-${question.codQuestion}`} label="Resposta" onChange={(value) => this.handlerAnswer(value, question.codQuestion)} />
                                                </Col>
                                                <Col>
                                                    <textarea id={`details-${question.codQuestion}`} cols="30" rows="3" value={question.comment} onChange={(event) => this.handlerAnswerComment(event, question.codQuestion)} />
                                                </Col>
                                            </Row>
                                            {index !== question.length - 1 ? <hr /> : null}
                                        </div>
                                    ))
                                }
                                <hr/>
                            </div>
                        </Wizard>
                    </ModalBody>
                </Modal>
            );
        } 
        return (null);
    }
}