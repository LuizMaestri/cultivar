import React, { Component } from 'react';
import { Row, Col, Table } from 'reactstrap';
import Line from './Line.jsx';
import { getRequest } from '../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            company: null,
            volunteers: []
        };
        this.listVolunteers = this.listVolunteers.bind(this);
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

    listVolunteers(company){
        getRequest(
            `/volunteer?cod_cnpj=${company.cnpj}`,
            res => this.setState({ company, volunteers: res.data })
        )
    }

    render(){
        const { company, volunteers } = this.state;
        if ( company ){
            return (
                <Row>
                    <Col md="1"/>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>CPF</th>
                                    <th>Nome</th>
                                    <th>Status</th>
                                    <th>Detalhes</th>
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
                    <Col md="3">
                    </Col>
                    <Col md="1"/>
                </Row>
            );
        }
        return (null);
    }
}