import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import { Filter } from '../../../../components';
import Line from './Line.jsx';
import { getRequest } from '../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            filter: '',
            company: null,
            volunteers: []
        };
        this.listVolunteers = this.listVolunteers.bind(this);
        this.handlerFilter = this.handlerFilter.bind(this);
    }

    componentWillMount(){
        const { cpf } = this.props; 
        getRequest(
            `company?cod_cpf=${cpf}`,
            companyRes => {
                const company = companyRes.data[0];
                if (company){
                    this.listVolunteers(company)
                }
            }
        )
    }

    handlerFilter(event) {
        const { company } = this.state;
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0){
            this.listVolunteers(company, filter);
        } else {
            this.setState({filter});
        }
    }

    listVolunteers(company, filter=''){
        getRequest(
            `/volunteer?cod_cnpj=${company.cnpj}&filter=${filter}`,
            res => this.setState({ company, filter, volunteers: res.data })
        )
    }

    render(){
        const { company, volunteers, filter } = this.state;
        if ( company ){
            return (
                <Row>
                    <Col md="1"/>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>CPF</th>
                                    <th>
                                        <Filter label="Nome&nbsp;" value={filter} handlerFilter={this.handlerFilter}/>
                                    </th>
                                    <th>Status</th>
                                    <th>Detalhes</th>
                                    <th>Participações</th>
                                    <th colSpan="2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    volunteers.length ?
                                        volunteers.map(volunteer => <Line key={volunteer.user.cpf} volunteer={volunteer} afterDelete={this.listVolunteers}/>) :
                                    (
                                        <tr>
                                            <td colSpan="3">
                                                <strong>
                                                    Nenhum Voluntário Cadastrado
                                                </strong>
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </Table>
                    </Col>
                    <Col md="1"/>
                </Row>
            );
        }
        return (null);
    }
}