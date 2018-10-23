import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { postRequest, getRequest } from '../../../../../../utils/http';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Wizard } from '../../../../../../components';
import { Advertising, Technology, Personality, Experience, Result, Mentoring } from './steps';
import axios from 'axios';
import './form.css'

export default class extends Component{
    constructor(){
        super();
        this.state = {
            evaluate: null,
            tecnologyQuestions: [],
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
        axios.all([
            getRequest('/technology', res => res.data),
            getRequest('/personality', res => res.data),
            getRequest('/mentoring', res => res.data)
        ]).then(
            res => {
                const { cpf } = this.props;
                const tecnologyQuestions = res[0];
                const personalityQuestions = res[1];
                const mentoringQuestions = res[2];
                let evaluate = {
                    technologies: tecnologyQuestions.map(
                        technology => { 
                            return {
                                technology, answer: null
                            }
                        }
                    ),
                    answerPersonalities: personalityQuestions.map(
                        personality => {
                            return {
                                personality, answer: null
                            }
                        }
                    ),
                    mentoring: mentoringQuestions.map(
                        mentoring => {
                            return {
                                mentoring, answer: null
                            }
                        }
                    ),
                    experience: {
                        experience: '',
                        difficulty: null,
                        expectation: '',
                        flEnjoy: '',
                        enjoy: '',
                        notEnjoy: '',
                        suggest: ''
                    },
                    skills:[],
                    again: {
                        interest: null,
                        others: [],
                        comment: ''
                    }
                    cpf
                }
                this.setState({
                    evaluate,
                    tecnologyQuestions,
                    personalityQuestions,
                    mentoringQuestions
                })
            }
        );
    }

    updateEvaluate(evaluate){
        this.setState({ evaluate })
    }

    handlerSubmit(){
        const { afterSubmit, close } = this.props;
        const { evaluate } = this.state;
        postRequest(
            '/company',
            evaluate,
            () => {
                afterSubmit();
                close();
            }
        );
    }

    render(){
        const { close, isOpen, title } = this.props;
        const { evaluate, tecnologyQuestions, personalityQuestions, mentoringQuestions } = this.state;
        if (evaluate) {
            return (
                <Modal isOpen={isOpen} toggle={close}>
                    <ModalHeader toggle={close}>Avaliação</ModalHeader>
                    <ModalBody>
                        <Wizard onCancel={close} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                            <Advertising/>
                            <Technology evaluate={evaluate} tecnologyQuestions={tecnologyQuestions} update={this.updateEvaluate}/>
                            <Personality evaluate={evaluate} personalityQuestions={personalityQuestions} update={this.updateEvaluate}/>
                            <Experience evaluate={evaluate} update={this.updateEvaluate} title={title}/>
                            <Result evaluate={evaluate} update={this.updateEvaluate}/>
                            <Mentoring evaluate={evaluate} mentoringQuestions={mentoringQuestions} update={this.updateEvaluate}/>
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