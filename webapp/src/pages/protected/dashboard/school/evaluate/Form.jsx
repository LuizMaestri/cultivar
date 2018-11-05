import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { postRequest, getRequest } from '../../../../../utils/http';
import { Modal, ModalHeader, ModalBody, Row, Col } from 'reactstrap';
import { Wizard, Radio, Input, Switch } from '../../../../../components';
import { Roles, AnswerAgree, Rating } from '../../../../../model';
import Participant from './Participant';
import axios from 'axios';
import './form.css'

export default class extends Component{
    constructor(){
        super();
        this.state = {
            evaluate: null
        };
        this.updateEvaluate = this.updateEvaluate.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }
    
    static propTypes = {
        afterSubmit: PropTypes.func.isRequired,
        isOpen: PropTypes.bool.isRequired,
        close: PropTypes.func.isRequired
    }

    componentWillMount(){
        const { code, codSchool, isProject } = this.props;
        axios.all([
            getRequest(!isProject ? `/event/${code}` : `/project/${code}?withParticipants=true`, res => res.data),
            getRequest(`/mentoring/${Roles.SCHOOL_ADMIN}`, res => res.data),
            getRequest(`/activity/${Roles.SCHOOL_ADMIN}`, res => res.data)
        ]).then(
            res => {
                this.setState({
                    event: res[0],
                    activities: res[2],
                    evaluate: {
                        mentoring: res[1].map(
                            mentoring => {
                                return {
                                    mentoring, answer: null
                                }
                            }
                        ),
                        ratings: res[0].participants.map(
                            participant => {
                                return { participant, rating: new Rating() }
                            }
                        ),
                        suggest: '',
                        activities: [],
                        comment: '',
                        project: this.props.isProject,
                        codSchool
                    }
                })
            }
        );
    }

    updateEvaluate(evaluate){
        this.setState({ evaluate })
    }

    selectRating(value, index){
        const { evaluate } = this.state;
        const { ratings } = evaluate
        ratings[index].rating.grade = value * 20;
        this.setState({ evaluate });
    }

    handlerComment(event, index){
        const { evaluate } = this.state;
        const { ratings } = evaluate
        ratings[index].rating.comment = event.target.value;
        this.setState({ evaluate });
    }

    handleActivities(value, newActivity) {
        const { evaluate } = this.state;
        if (value) {
            evaluate.activities.push(newActivity);
        } else {
            const { activities } = evaluate;
            evaluate.activities = activities.filter(activity => activity.codActivity !== newActivity.codActivity);
        }
        this.setState({ evaluate });
    }

    handlerSuggest(event){
        const { evaluate } = this.state;
        evaluate.suggest = event.target.value;
        this.setState({ evaluate });
    }

    checkMentoring(at, index) {
        const { mentoring } = this.state.evaluate;
        const { answer } = mentoring[index]
        return answer === at;
    }

    onCheckMentoring(at, index) {
        const { evaluate } = this.state;
        const { mentoring } = evaluate;
        mentoring[index].answer = at;
        this.setState({ evaluate })
    }

    handlerSubmit(){
        const { afterSubmit, close, isProject, code } = this.props;
        const { evaluate } = this.state;
        const url = isProject ? `/project/${code}/evaluate` : `/event/${code}/evaluate`
        postRequest(
            url,
            {
                schoolDTO: evaluate
            },
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { close, isOpen, title } = this.props;
        const { evaluate, event, activities } = this.state;
        if (evaluate) {
            const { mentoring: mentoringQuestions, ratings, suggest } = evaluate;
            return (
                <Modal isOpen={isOpen} toggle={close}>
                    <ModalHeader toggle={close}>Avaliação</ModalHeader>
                    <ModalBody>
                        <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                            <div>
                                <h3>O que você observou?</h3>
                                <br />
                                <Row>
                                    <Col />
                                    {
                                        AnswerAgree.values()
                                            .map(
                                                me => (
                                                    <Col>
                                                        <strong>
                                                            {AnswerAgree.translate(me)}
                                                        </strong>
                                                    </Col>
                                                )
                                            )
                                    }
                                </Row>
                                {
                                    mentoringQuestions.length ?
                                        mentoringQuestions.map(
                                            (mentoringQuestion, index) => {
                                                const { mentoring } = mentoringQuestion;
                                                return (
                                                    <Fragment>
                                                        <Row key={`personality-${mentoring.codQuestion}`}>
                                                            <Col>{mentoring.question}</Col>
                                                            {
                                                                AnswerAgree.values()
                                                                    .map(
                                                                        me => (
                                                                            <Col key={me} style={{ paddingTop: '15px' }}>
                                                                                <Radio value={me} name={`personality-${mentoring.codQuestion}`} checked={this.checkMentoring(me, index)} onChange={() => this.onCheckMentoring(me, index)} />
                                                                            </Col>
                                                                        )
                                                                    )
                                                            }
                                                        </Row>
                                                        {index !== mentoringQuestions.length - 1 ? <hr /> : null}
                                                    </Fragment>
                                                );
                                            }
                                        ) : null
                                    }
                                <hr className="row" />
                            </div>
                            <div>
                                <h3>Você tem alguma sugestão de melhoria relacionada ao Projetos da CnE?</h3>
                                <Input id="comment" label="&spnb;" type="textarea" value={suggest} onChange={this.handlerSuggest.bind(this)} />
                                <hr className="row"/>
                            </div>
                            <div>
                                <h3>Você tem interesse em ajudar em alguma outra atividade da Computação na Escola?</h3>
                                <Row>
                                    {
                                        activities.map(
                                            activity => (
                                                <Col md="4" key={`activity-${activity.codActivity}`}>
                                                    <Switch id={`activity-${activity.codActivity}`} label={activity.name} onChange={value => this.handleActivities(value, activity)} />
                                                </Col>
                                            )
                                        )
                                    }
                                </Row>
                                <hr className="row" />
                            </div>
                            {
                                ratings.length ?
                                    (
                                        <div>
                                            <p>
                                                Agora sobre a participação dos voluntarios
                                            </p>
                                            <hr className="row" />
                                        </div>
                                    ) : null
                                }
                            {
                                ratings.map(
                                    (rating, index) => 
                                        <Participant 
                                            participant={rating.participant}
                                            onRatingSelect={(nextValue, prevValue, name) => this.selectRating(nextValue, index)}
                                            onComment={(event) => this.handlerComment(event, index)}
                                            rating={rating.rating}
                                        />
                                )
                            }
                        </Wizard>
                    </ModalBody>
                </Modal>
            );
        } else{
            return (
                <Modal isOpen={isOpen} toggle={close}>
                    <ModalHeader toggle={close}>Avaliação</ModalHeader>
                </Modal>
            )
        }
    }
}