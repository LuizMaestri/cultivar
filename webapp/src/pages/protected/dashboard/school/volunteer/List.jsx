import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import VolunteerItem from './ListItem.jsx';
import { getRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            users: []
        };
    }

    componentWillMount(){
        const {codSchool } = this.props;
        getRequest(`/volunteer?cod_school=${codSchool}`, res => this.setState({ users: res.data.map(volunteer => volunteer.user)}))
    }

    render(){
        const { users } = this.state;
        return (
            <ListGroup>
                {
                    users.length ?
                        users.map(
                            user => <VolunteerItem key={user.cpf} user={user} />
                        ) :
                        <ListGroupItem>
                            <strong>
                                Nenhum Voluntário Cadastrado
                            </strong>
                        </ListGroupItem>
                }
            </ListGroup>
        )
    }
}