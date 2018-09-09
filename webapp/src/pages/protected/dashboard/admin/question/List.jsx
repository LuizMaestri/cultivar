import React, { Component } from 'react';
import { Question, Roles } from '../../../../../model';
import { getRequest, postRequest, deleteRequest } from '../../../../../utils/http';
import { Row, Col, Form, Button, Table } from 'reactstrap';
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
        this.handlerResponds = this.handlerResponds.bind(this);
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

    handlerResponds(event){
        const { newQuestion } = this.state;
        newQuestion.responds = event.target.value;
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
        if(!newQuestion.question || !newQuestion.responds){
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
                        <Form>
                            <Row>
                                <Col md="5">
                                    <Input id="newQuestion" label="Questão" invalidMessage="Campo Obrigatório" invalid={this.state.invalid} onChange={this.handlerQuestion} required/>
                                </Col>
                                <Col md="4">
                                    <Input id="destiny" type="select" label="Destinada" invalidMessage="Campo Obrigatório" invalid={this.state.invalid} onChange={this.handlerResponds} required>
                                        <option>Selecione</option>
                                        <option value={Roles.VOLUNTEER}>{Roles.translate(Roles.VOLUNTEER)}</option>
                                        <option value={Roles.COMPANY_ADMIN}>{Roles.translate(Roles.COMPANY_ADMIN)}</option>
                                    </Input>
                                </Col>
                                <Col style={{paddingTop: '4%'}}>
                                    <Button type="button" color="primary" onClick={this.handlerSubmit} style={{marginTop: '3%'}}>
                                        Cadastrar
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <td>
                                        Questão
                                    </td>
                                    <td>
                                        Destinada
                                    </td>
                                    <td/>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questions.length ? 
                                        questions.map(
                                            question => (
                                                <tr>
                                                    <td>
                                                        {question.question}
                                                    </td>
                                                    <td>
                                                        {Roles.translate(question.responds)}
                                                    </td>
                                                    <td>
                                                        <FaTrash style={{cursor: 'pointer'}} color="red" onClick={() => this.handlerDelete(question.codQuestion)}/>
                                                    </td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    Nenhuma Questão cadastrada Cadastrada
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}