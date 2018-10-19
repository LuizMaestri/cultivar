import React, { Component, Fragment } from 'react';
import { getRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Form from './Form.jsx';
import { Filter, Pagination } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            typesEvent: [],
            filter: '',
            count: 0,
            pages: 0
        };
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        getRequest(
            '/typeEvent/page/0',
            res => {
                const { data: typesEvent, count } = res.data
                this.setState({
                    pages: count / 20,
                    typesEvent,
                    count
                });
            }
        );
    }

    handlerFilter(event) {
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0) {
            getRequest(
                `/typeEvent/page/0?filter=${filter}`,
                res => {
                    const { data: typesEvent, count } = res.data
                    this.setState({
                        pages: count / 20,
                        typesEvent,
                        count,
                        filter
                    })
                }
            );
        } else {
            this.setState({ filter })
        }
    }

    onChangePage(pageNumber) {
        const { filter } = this.state;
        getRequest(
            `/typeEvent/page/${pageNumber}?filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const { data: typesEvent, count } = res.data;
                this.setState({
                    pages: count / 20,
                    typesEvent,
                    count
                });
            }
        );
    }

    render(){
        const { typesEvent, filter, count, pages } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Tipo de Eventos</h3>
                    </Col>
                    <Col md="1">
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>
                                        <Filter label="Nome&nbsp;&nbsp;" value={filter} handlerFilter={this.handlerFilter.bind(this)} />                                        
                                    </th>
                                    <th>Anexos</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    typesEvent.length?
                                    typesEvent.map(
                                        typeEvent => (
                                            <ListItem key={typeEvent.type} typeEvent={typeEvent} afterDelete={this.componentWillMount}/>
                                        )
                                    ) : (
                                        <tr>
                                                <td colSpan="3">
                                                    <strong>Nenhum Tipo de Evento cadastrado</strong>
                                                </td>
                                            </tr>
                                        )
                                    }
                            </tbody>
                        </Table>
                        <Pagination pages={pages} count={count} onChangePage={this.onChangePage.bind(this)} />
                    </Col>
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount}/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}