import React, { Component } from 'react';
import { Row, Col, Form, Label } from 'reactstrap';
import { Input, Wizard, DatePicker, MaskInput, Option, Switch, Required } from '../../../components';
import { Volunteer, Schooling, Answer, Roles } from '../../../model';
import { getRequest, postRequest } from '../../../utils/http';
import axios from 'axios';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            volunteer: new Volunteer(),
            questions: [],
            companies: [],
            confirmPassword: ''
        }
        this.handlerName = this.handlerName.bind(this);
        this.handlerCpf = this.handlerCpf.bind(this);
        this.handlerRg = this.handlerRg.bind(this);
        this.handlerPhone = this.handlerPhone.bind(this);
        this.handlerComplete = this.handlerComplete.bind(this)
        this.handlerCourse = this.handlerCourse.bind(this)
        this.handlerSchooling = this.handlerSchooling.bind(this)
        this.handlerJob = this.handlerJob.bind(this);
        this.handlerCompany = this.handlerCompany.bind(this);
        this.handlerEmail = this.handlerEmail.bind(this);
        this.handlerBirth = this.handlerBirth.bind(this);
        this.handlerPassword = this.handlerPassword.bind(this);
        this.handlerConfirmPassword = this.handlerConfirmPassword.bind(this);
        this.handlerCity = this.handlerCity.bind(this);
        this.handlerNeighborhood = this.handlerNeighborhood.bind(this);
        this.handlerStreet = this.handlerStreet.bind(this);
        this.handlerNumber = this.handlerNumber.bind(this);
        this.handlerAnswer = this.handlerAnswer.bind(this);
        this.handlerAnswerComment = this.handlerAnswerComment.bind(this);
        this.handlerSubmit = this.handlerSubmit.bind(this);
    }

    componentWillMount(){
        axios.all([
            getRequest(`/question/${Roles.VOLUNTEER}`, res => res.data),
            getRequest('/company', res => res.data )
        ]).then(res => {
            const { volunteer } = this.state;
            volunteer.answers = res[0].map(question => new Answer(question))
            this.setState({ questions: res[0], companies: res[1] })
        });
    }

    // user
    handlerName(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.name = event.target.value;
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerRg(event){
        const { volunteer } = this.state;
        volunteer.rg = event.target.value.replace('_', '');
        this.setState({ volunteer });
    }
    
    handlerCpf(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.cpf = event.target.value.replace(/[.-]/g, '');
        volunteer.user = user;
        this.setState({ volunteer });
    }
    
    handlerPhone(event) {
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.phone = event.target.value.replace(/[()-]/g, '');
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerJob(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.job = event.target.value;
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerCompany(event){
        const { volunteer, companies } = this.state;
        for (const company of companies) {
            if(company.cnpj === event.target.value){
                volunteer.company = company;
                break;
            }
        }
        this.setState({ volunteer });
    }

    handlerEmail(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.email = event.target.value;
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerBirth(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        const { value } = event.target;
        user.birth = value ? new Date(value) : null;
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerComplete(value){
        const { volunteer } = this.state;
        volunteer.conclusion = value;
        this.setState({ volunteer });
    }

    handlerSchooling(event){
        const { volunteer } = this.state;
        volunteer.schooling = event.target.value;
        this.setState({ volunteer });
    }

    handlerCourse(event){
        const { volunteer } = this.state;
        volunteer.course = event.target.value;
        this.setState({ volunteer });
    }

    handlerPassword(event){
        const { volunteer } = this.state;
        const { user } = volunteer;
        user.password = event.target.value;
        volunteer.user = user;
        this.setState({ volunteer });
    }

    handlerConfirmPassword(event){
        let { confirmPassword } = this.state;
        confirmPassword = event.target.value;
        this.setState({ confirmPassword });
    }

    //address
    handlerCity(event) {
        const { volunteer } = this.state;
        const { address } = volunteer.user;
        address.city = event.target.value;
        volunteer.user.address = address;
        this.setState({ volunteer });
    }

    handlerNeighborhood(event) {
        const { volunteer } = this.state;
        const { address } = volunteer.user;
        address.neighborhood = event.target.value;
        volunteer.user.address = address;
        this.setState({ volunteer });
    }

    handlerStreet(event) {
        const { volunteer } = this.state;
        const { address } = volunteer.user;
        address.street = event.target.value;
        volunteer.user.address = address;
        this.setState({ volunteer });
    }

    handlerNumber(event) {
        const { volunteer } = this.state;
        const { address } = volunteer.user;
        address.number = event.target.value;
        volunteer.user.address = address;
        this.setState({ volunteer });
    }

    //Question
    handlerAnswer(value, codQuestion){
        const { volunteer } = this.state;
        for (const answer of volunteer.answers) {
            if (answer.question.codQuestion === codQuestion){
                answer.answer = value;
                break;
            }
        }
        this.setState({ volunteer });
    }

    handlerAnswerComment(event, codQuestion){
        const { volunteer } = this.state;
        for (const answer of volunteer.answers) {
            if (answer.question.codQuestion === codQuestion){
                answer.answer = event.target.value;
                break;
            }
        }
        this.setState({ volunteer });
    }

    handlerSubmit(){
        const { afterSubmit } = this.props;
        postRequest(
            '/volunteer',
            this.state.volunteer,
            () => postRequest('/auth', {}, afterSubmit)
        );
    }

    render(){
        const { questions, companies, volunteer } = this.state;
        const maxDate = new Date().toJSON().split('T')[0];
        return (
            <Row>
                <Col/>
                <Col>
                    <Wizard onCancel={()=> null} submitLabel="cadastrar" onSubmit={this.handlerSubmit}>
                        <div>
                            <h3>Dados do Voluntário</h3>
                            <Input id="nameReponsible" label="Nome Completo" invalidMessage="Nome Completo é obrigatório" onChange={this.handlerName} required />
                            <Row>
                                <Col>
                                    <MaskInput id="cpf" label="CPF" invalidMessage="CPF é obrigatório" mask="999.999.999-99" onChange={this.handlerCpf} required />
                                </Col>
                                <Col>
                                    <MaskInput id="rg" label="RG" invalidMessage="RG é obrigatório" mask="99999999999" onChange={this.handlerRg} required />
                                </Col>
                            </Row>
                            <MaskInput id="phoneResponsible" label="Número para Contato" invalidMessage="Número para Contato é obrigatório" mask="(99)9999-9999" onChange={this.handlerPhone} required />
                            <Input id="company" type="select" label="Empresa" invalidMessage="Empresa é obrigatório" onChange={this.handlerCompany} required >
                                <option value="">Selecione</option>
                                {
                                    companies.length ? 
                                        companies.map(
                                            company => <option key={company.cnpj} value={company.cnpj}>{company.name}</option>
                                        ) : null
                                }
                            </Input>
                            <Input id="job" label="Cargo na Empresa" invalidMessage="Cargo na Empresa é obrigatório" onChange={this.handlerJob} required />
                            <Row>
                                <Col>
                                    <Label for="radio1">Escolaridade <Required/></Label>
                                    {
                                        Schooling.values().map(
                                            schooling => (
                                                <Option name="radio1" key={schooling} value={schooling} label={Schooling.translate(schooling)} onChange={this.handlerSchooling}/>
                                            )
                                        )
                                    }
                                </Col>
                                <Col>
                                    <Row>
                                        <Col>
                                            <Switch id="complete" label="Completo" onChange={this.handlerComplete} checkedChildren="Sim" unCheckedChildren="Não"/>
                                        </Col>
                                    </Row>
                                    {
                                        volunteer.schooling === Schooling.UNIVERSITY_GRADUATE || 
                                            volunteer.schooling === Schooling.POSTGRADUATE_STUDIES? (
                                            <div>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <Form inline>
                                                                <Input id="course" label="Curso" invalidMessage="Curso é obrigatório" onChange={this.handlerCourse} required/>
                                                        </Form>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ):
                                        null
                                    }
                                </Col>
                            </Row>
                            <DatePicker id="birth" label="Nascimento" invalidMessage="Nascimento é obrigatório" max={maxDate} onChange={this.handlerBirth} required />
                            <Input id="email" type="email" label="Email" invalidMessage="Email é obrigatório" onChange={this.handlerEmail} required />
                            <Row>
                                <Col>
                                    <Input id="password" type="password" label="Senha" invalidMessage="Senha é obrigatório" onChange={this.handlerPassword} required />
                                </Col>
                                <Col>
                                    <Input id="passwordConfirm" type="password" label="Confirmar Senha" invalidMessage="As senhas devem ser idênticas" onChange={this.handlerConfirmPassword} required />
                                </Col>
                            </Row>
                        </div>
                        <div>
                            <h3>Enderço do Voluntário</h3>
                            <Input id="city" label="Cidade" invalidMessage="Cidade é obrigatório" onChange={this.handlerCity} required />
                            <Input id="neighborhood" label="Bairro" invalidMessage="Bairro é obrigatório" onChange={this.handlerNeighborhood} required />
                            <Row>
                                <Col>
                                    <Input id="street" label="Lougradouro" invalidMessage="Lougradouro é obrigatório" onChange={this.handlerStreet} required />
                                </Col>
                                <Col md="3">
                                    <Input id="number" label="Número" onChange={this.handlerNumber} />
                                </Col>
                            </Row>
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
                                                <Switch id={`question-${question.codQuestion}`} label="Resposta" onChange={(value) => this.handlerAnswer(value, question.codQuestion)}/>
                                            </Col>
                                            <Col>
                                                <textarea id={`details-${question.codQuestion}`} cols="30" rows="3" onChange={(event)=> this.handlerAnswerComment(event, question.codQuestion)}/>
                                            </Col>
                                        </Row>
                                        { index !== question.length-1 ?<hr/> : null}
                                    </div>
                                ))
                            }
                        </div>
                    </Wizard>
                </Col>
                <Col/>
            </Row>
        );
    }
}