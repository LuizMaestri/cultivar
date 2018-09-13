import React, { Component } from 'react';
import { Row, Col, ListGroupItem } from 'reactstrap';
import { FaTrash } from 'react-icons/fa';
import Details from './Details.jsx';
import PropTypes from 'prop-types';
import { deleteRequest } from '../../../../../utils/http';
import formatter from '../../../../../utils/formatter';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    static propTypes = {
        user: PropTypes.object.isRequired
    }

    toggle(){
        const { isOpen } = this.state;
        this.setState({isOpen: !isOpen});
    }

    render(){
        const { user } = this.props;
        const { isOpen } = this.state;
        return (
            <ListGroupItem>
                <Row>
                    <Col onClick={this.toggle} className="text-ellipsis" style={{ cursor: 'pointer' }}>
                        {formatter.cpf(user.cpf)} - {user.name}
                    </Col>
                </Row>
                { isOpen && <Details cpf={user.cpf} isOpen={isOpen} close={this.toggle} /> }
            </ListGroupItem>
        );
    }
}