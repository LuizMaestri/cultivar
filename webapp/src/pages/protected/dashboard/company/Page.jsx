import React, { Component } from 'react';
import { getRequest, deleteRequest, putRequest } from '../../../../utils/http';
import { Status } from '../../../../model';
import { Row, Col, Table, Label, Button } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';

const headers = ['CPF', 'Nome', 'Função', 'Status', 'Termo de Responsabilidade', 'Termo de Voluntariado', ''];

export default class extends Component{
    constructor(){
        super();
        this.state = {
            companyId: null,
            volunteers: []
        }
        this.interval = null;
    }

    componentWillMount(){
        getRequest(
            `/place?cod_cpf=${this.props.user.id}`,
            resCompany => {
                const { id } = resCompany.data[0];
                this.requestVolunteers(id);
            }
        );        
    }

    componentDidMount(){
        this.interval = setInterval(() => this.requestVolunteers(this.state.companyId), 300000)
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    requestVolunteers(companyId){
        getRequest(
            `/volunteer?cod_cnpj=${companyId}`,
            res => {
                const volunteers = res.data.map(volunteer => {
                    const { birth, createAt } = volunteer;
                    volunteer.birth = new Date(`${birth[2]}-${birth[1]}-${birth[0]}`).toISOString();
                    volunteer.createAt = new Date(createAt).toISOString();
                    return volunteer;
                });
                this.setState({ volunteers, companyId })
            }
        )
    }

    delete(volunteer) {
        const { id, name } = volunteer;
        window.confirm(`Tem certeza de deseja deletar o registro ${id}?`) &&
            deleteRequest(`/place/${id}`)
                .then(() => {
                    alert(`Registro ${name} deletado com sucesso`);
                    this.requestVolunteers(this.state.companyId);
                })
                .catch(() => alert(`Problemas ao deletar registro: ${id}`));
    }

    translateStatus(status){
        const style = { color: 'white' };
        const statuses = {};
        statuses[Status.APPROVED] = (
            <Label className="btn btn-success" style={style}>
                <strong>Aprovado</strong>
            </Label>
        );
        statuses[Status.RECOMMEND] = (
            <Label className="btn btn-info" style={style}>
                <strong>Recomendado</strong>
            </Label>
        );
        statuses[Status.WAIT_TR] = (
            <Label className="btn btn-warning" style={style}>
                <strong>Esperando envio Termo de Responsabilidade</strong>
            </Label>
        );
        statuses[Status.WAIT_RECOMMEND] = (
            <Label className="btn btn-danger" style={style}>
                <strong>Esperando Recomendação</strong>
            </Label>
        );
        statuses[Status.WAIT_TV] = (
            <Label className="btn btn-warning" style={style}>
                <strong>Esperando envio Termo de Voluntariado</strong>
            </Label>
        );
        return statuses[status];
    }

    getTRButton(volunteer){
        if (volunteer.status === Status.WAIT_TR){
            return (<Button color="warning">Lembrar</Button>);
        }
        return (<a href="tr.pdf" download="Termo de Responsabilidade.pdf" className="btn btn-secondary">Termo de Responsabilidade</a>);
    }
    getTVButton(volunteer) {
        switch (volunteer.status) {
            case Status.WAIT_RECOMMEND: return (<Button color="info" onClick={() => this.handlerRecomend.bind(this)(volunteer)}>Recomendar</Button>);
            case Status.WAIT_TV: return (<Button color="warning">Lembrar</Button>);
            case Status.WAIT_TR: return (<Button color="info" disabled>Recomendar</Button>);
            default: return (<a href="tr.pdf" download="Termo de Responsabilidade.pdf" className="btn btn-secondary">Termo de Responsabilidade</a>);
        }
    }

    handlerRecomend(volunteer){
        volunteer.status = Status.WAIT_TV;
        putRequest(`/volunteer/${volunteer.id}`, volunteer, 
        () =>{
            debugger;
            alert(`Voluntário ${volunteer.name} recomendado.`);
            this.requestVolunteers(this.state.companyId);
        }
    )
    }

    render(){
        const { volunteers } = this.state; 
        return (
            <Row>
                <Col md={1}/>
                <Col md={6}>
                    <Table hover striped>
                        <thead>
                            <tr>
                                { headers.map(header => (<th key={header}>{ header }</th>)) }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                volunteers ?
                                volunteers.map(
                                    volunteer => (
                                        <tr style={{ cursor: 'pointer' }} key={volunteer.id}>
                                            <td style={{ minWidth: '10%'}}>{ volunteer.id }</td>
                                            <td style={{ minWidth: '15%' }}>{ volunteer.name }</td>
                                            <td style={{ width: '15%' }}>{ volunteer.job }</td>
                                            <td style={{ width: '15%' }}>
                                                { this.translateStatus(volunteer.status) }
                                            </td>
                                            <td>
                                                { this.getTRButton(volunteer) }
                                            </td>
                                            <td>
                                                { this.getTVButton(volunteer.status) }
                                            </td>
                                            <td onClick={this.delete.bind(this)}>
                                                <FaTrash color="red" />
                                            </td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan={headers.length + 1} style={{ width: '100%' }}>
                                            s
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </Col>
                <Col md={1} />
                <Col md={3} >
                    a
                </Col>
                <Col md={1} />
            </Row>
        );
    }
}