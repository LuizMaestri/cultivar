import React, { Component } from 'react';
import { Card, CardBody, Form, Button } from 'reactstrap';
import { Input } from '../../../../../components';
import { postRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            value : '',
            invalid: false
        };
        this.handlerActivity = this.handlerActivity.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerActivity(event){
        this.setState({ value: event.target.value, invalid: false });
    }

    handlerSubmit(){
        const { value } = this.state;
        if(!value){
            this.setState({invalid: true})
        }
        const { afterSubmit } = this.props;
        postRequest(
            '/activity',
            { name: value },
            () => {
                this.setState({value: ''});
                afterSubmit();
            }
        );
    }

    render(){
        return (
            <Card>
                <CardBody>
                    <Form>
                        <Input id="mentoring" label="Atividade" {...this.state } invalidMessage="Campo Obrigatório" onChange={this.handlerActivity} required />
                        <Button type="button" color="primary" className="float-right" onClick={this.handlerSubmit}>Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}