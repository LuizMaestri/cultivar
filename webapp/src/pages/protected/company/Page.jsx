import React, { Component } from 'react';
import { ListPage } from '../../../components';
import { getRequest } from '../../../utils/http';
import Line from './Line.jsx';

const headers = ['CNPJ', 'Nome', 'Status']
const mapping = {
    CNPJ: 'id',
    Nome: 'name',
    Status: 'status'
}


export default class CompanyList extends Component {

    constructor() {
        super();
        this.state = {
            companies: []
        }
    }

    componentWillMount() {
        getRequest(
            'volunteer',
            res => this.setState({ companies: res.data }),
            () => { }
        )
    }

    render() {
        return (
            <ListPage title="Empresas Envolvidas" elements={this.state.companies}
                headers={headers} mapping={mapping} addOnClick={console.log}
                noneMessage="Nenhum Voluntário encontrado." component={Line} />
        );
    }
}