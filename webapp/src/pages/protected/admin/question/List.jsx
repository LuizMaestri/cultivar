import React, { Component, Fragment } from 'react';
import { Roles } from '../../../../model';
import { getRequest, deleteRequest } from '../../../../utils/http';
import { Row, Col, Table} from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Form from './Form.jsx';

export default class extends Component{
    constructor(){
        super()
        this.state = {
            questions: []
        }
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    componentWillMount(){
        getRequest('/question', res => this.setState({ questions: res.data }));
    }

    handlerDelete(codQuestion){
        deleteRequest(`/question/${codQuestion}`, this.componentWillMount);
    }

    render(){
        const { questions } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Questões</h3>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <td>
                                        <strong>Questão</strong>
                                    </td>
                                    <td>
                                        <strong>Destinada</strong>
                                    </td>
                                    <td/>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    questions.length ? 
                                    questions.map(
                                        question => (
                                                <tr key={question.codQuestion}>
                                                    <td>
                                                        <strong>{question.question}</strong>
                                                    </td>
                                                    <td>
                                                        <strong>{Roles.translate(question.responds)}</strong>
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
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount.bind(this)} />
                    </Col>
                </Row>
            </Fragment>

        );
    }
}