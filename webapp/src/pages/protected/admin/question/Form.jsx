import React, { Component } from 'react';
import { Question, Roles } from '../../../../model';
import PropTypes from 'prop-types';
import { postRequest } from '../../../../utils/http';
import { Form, Button, Card, CardBody } from 'reactstrap';
import { Input } from '../../../../components';

export default class extends Component{
    constructor() {
        super()
        this.state = {
            newQuestion: new Question(),
            invalid: false
        }
        this.handlerQuestion = this.handlerQuestion.bind(this);
        this.handlerResponds = this.handlerResponds.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    static propTypes = {
        afterSubmit: PropTypes.func.isRequired
    }

    handlerQuestion(event) {
        const { newQuestion } = this.state;
        newQuestion.question = event.target.value;
        this.setState({ newQuestion, invalid: false });
    }

    handlerResponds(event) {
        const { newQuestion } = this.state;
        newQuestion.responds = event.target.value;
        this.setState({ newQuestion, invalid: false });
    }

    handlerSubmit() {
        const { newQuestion } = this.state;
        if (!newQuestion.question || !newQuestion.responds) {
            this.setState({ invalid: true })
            return;
        }
        const { afterSubmit } = this.props;
        postRequest(
            '/question',
            newQuestion,
            () =>{
                afterSubmit();
                this.setState({ newQuestion: new Question()});
            }
        );
    }

    render(){
        const { newQuestion } = this.state;
        return (
            <Card>
                <CardBody>
                    <Form>
                        <Input id="newQuestion" label="Questão" invalidMessage="Campo Obrigatório" value={newQuestion.question} invalid={this.state.invalid} onChange={this.handlerQuestion} required />
                        <Input id="destiny" type="select" label="Destinada" invalidMessage="Campo Obrigatório" value={newQuestion.responds} invalid={this.state.invalid} onChange={this.handlerResponds} required>
                            <option>Selecione</option>
                            <option value={Roles.VOLUNTEER}>{Roles.translate(Roles.VOLUNTEER)}</option>
                            <option value={Roles.COMPANY_ADMIN}>{Roles.translate(Roles.COMPANY_ADMIN)}</option>
                        </Input>
                        <Button type="button" color="primary" className="float-right" onClick={this.handlerSubmit}>Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        );
    }
}