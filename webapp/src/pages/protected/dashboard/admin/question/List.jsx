import React, { Component } from 'react';
import Question from '../../../../../model/question';
import { getRequest, postRequest, deleteRequest } from '../../../../../utils/http';
import { Row, Col, Form, Button, ListGroup, ListGroupItem } from 'reactstrap';
import { Input } from '../../../../../components';
import { FaTrash } from 'react-icons/fa';

export default class extends Component{
    constructor(){
        super()
        this.state = {
            questions: [],
            newQuestion: new Question(),
            invalid: false
        }
        this.handlerQuestion = this.handlerQuestion.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    componentWillMount(){
        getRequest('/question', res => this.setState({ questions: res.data }));
    }

    handlerQuestion(event){
        const { newQuestion } = this.state;
        newQuestion.question = event.target.value;
        this.setState({ newQuestion, invalid: false });
    }

    handlerDelete(codQuestion){
        deleteRequest(
            `/question/${codQuestion}`,
            () => getRequest(
                '/question',
                res => this.setState({
                    questions: res.data
                })
            )
        );
    }

    handlerSubmit(){
        const { newQuestion } = this.state;
        if(!newQuestion.question){
            this.setState({invalid : true})
            return;
        }
        postRequest(
            '/question',
            newQuestion,
            () =>
                getRequest(
                    '/question',
                    res => this.setState({
                        questions: res.data,
                        newQuestion: new Question()
                    })
                )
        );
    }

    render(){
        const { questions } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <Form inline>
                            <Input id="newQuestion" label="Questão" invalidMessage="Campo Obrigatório" invalid={this.state.invalid} onChange={this.handlerQuestion} required/>
                            <Button type="button" color="primary" onClick={this.handlerSubmit}>Cadastrar</Button>
                        </Form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                questions.length ?
                                    questions.map(
                                        question => (
                                            <ListGroupItem key={question.codQuestion}>
                                                <Row>
                                                    <Col md="11">
                                                        {question.question}
                                                    </Col>
                                                    <br/>
                                                    <Col>
                                                        <FaTrash style={{cursor: 'pointer'}} color="red" onClick={() => this.handlerDelete(question.codQuestion)}/>
                                                    </Col>
                                                </Row>
                                            </ListGroupItem>
                                        )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>
                                                Nenhuma Questão cadastrada Cadastrada
                                            </strong>
                                        </ListGroupItem>
                                    )
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}