import React, { Component } from 'react';
import { Row, Col, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Details from './Details.jsx';
import PropTypes from 'prop-types';
import { Checkbox } from '../../../../../components';
import { deleteRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
        this.handlerDelete = this.handlerDelete.bind(this);
    }

    static propTypes = {
        volunteer: PropTypes.object.isRequired,
        afterDelete: PropTypes.func.isRequired
    }

    toggle(){
        const { isOpen } = this.state;
        this.setState({isOpen: !isOpen});
    }

    handlerDelete(){
        const { volunteer, afterDelete } = this.props;
        const { user } = volunteer;
        deleteRequest(`/user/${user.cpf}`, afterDelete)
    }

    render(){
        const { volunteer, onSelectVolunteer } = this.props;
        const { user } = volunteer;
        const { isOpen } = this.state;
        return (
            <ListGroupItem>
                <Row>
                    <Col md="1">
                        <Checkbox value={user.cpf} onChange={onSelectVolunteer} />
                    </Col>
                    <Col onClick={this.toggle} className="text-ellipsis" style={{ cursor: 'pointer' }}>
                        {formatter.cpf(user.cpf)} - {user.name}
                    </Col>
                    <Col md="2">
                        <FaTrash style={{ cursor: 'pointer' }} color="red" onClick={this.handlerDelete} />
                    </Col>
                </Row>
                { isOpen && <Details cpf={user.cpf} isOpen={isOpen} close={this.toggle} deleteFunc={this.handlerDelete}/> }
            </ListGroupItem>
        );
    }
}