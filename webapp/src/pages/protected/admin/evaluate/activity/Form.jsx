import React, { Component } from 'react';
import { Card, CardBody, Form, Button } from 'reactstrap';
import { Input } from '../../../../../components';
import { Roles } from '../../../../../model';
import { postRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            value : '',
            responds: '',
            invalid: false
        };
        this.handlerActivity = this.handlerActivity.bind(this);
        this.handlerResponds = this.handlerResponds.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    handlerActivity(event){
        this.setState({ value: event.target.value, invalid: false });
    }

    handlerResponds(event) {
        this.setState({ responds: event.target.value, invalid: false });
    }

    handlerSubmit(){
        const { value, responds } = this.state;
        if (!value || !responds) {
            this.setState({ invalid: true });
            return;
        }
        const { afterSubmit } = this.props;
        postRequest(
            '/activity',
            { name: value, responds },
            () => {
                this.setState({value: '', responds: ''});
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
                        <Input id="a" type="select" label="Destinada" value={this.state.responds} invalid={this.state.invalid} invalidMessage="Campo Obrigatório" onChange={this.handlerResponds} required >
                            <option value="">Selecione</option>
                            <option value={Roles.VOLUNTEER}>{Roles.translate(Roles.VOLUNTEER)}</option>
                            <option value={Roles.SCHOOL_ADMIN}>{Roles.translate(Roles.SCHOOL_ADMIN)}</option>
                        </Input>
                        <Button type="button" color="primary" className="float-right" onClick={this.handlerSubmit}>Cadastrar</Button>
                    </Form>
                </CardBody>
            </Card>
        )
    }
}