import React, { Component } from 'react';
import Table from './table/Table.jsx';
import ListHeader from './ListHeader.jsx';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

export default class ListPage extends Component{

    static propTypes ={
        title: PropTypes.string.isRequired,
        elements: PropTypes.array.isRequired,
        headers: PropTypes.array.isRequired,
        addOnClick: PropTypes.func.isRequired,
        component: PropTypes.any.isRequired,
        mapping: PropTypes.object.isRequired,
        noneMessage: PropTypes.string.isRequired,
        onclick: PropTypes.func
    };

    render(){
        const { title, addOnClick } = this.props;
        return(
            <div>
                <ListHeader title={title} onClick={addOnClick} />
                <br/>
                <Row>
                    <Col md="10 offset-1">
                        <Table  { ...this.props }/>
                    </Col>
                </Row>
            </div>
        );
    }
}