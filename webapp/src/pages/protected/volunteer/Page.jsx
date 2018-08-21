import React, { Component } from 'react';
import { ListPage } from '../../../components';
import { getRequest } from '../../../utils/http';
import Line from './Line.jsx';

const headers = ['CPF', 'Nome', 'Status']
const mapping = {
    CPF: 'id',
    Nome:'name',
    Status: 'status'
}


export default class VolunterList extends Component{

    constructor(){
        super();
        this.state = {
            volunteers: []
        }
    }

    componentWillMount(){
        getRequest(
            'volunteer',
            res => this.setState({ volunteers: res.data}),
            () => {}
        )
    }

    render(){
        return (
            <ListPage title="Mentores Voluntários" elements={this.state.volunteers} 
                headers={headers} mapping={mapping} addOnClick={console.log} noAddButton
                noneMessage="Nenhum Voluntário encontrado." component={Line} onDelete={this.componentWillMount.bind(this)}/>
        );
    }
}