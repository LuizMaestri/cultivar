import React, { Component, Fragment } from 'react';
import { getRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Form from './Form.jsx';
import { Filter, Pagination } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state ={
            projects: [],
            filter: '',
            count: 0,
            pages: 0
        };
    }

    componentWillMount(){
        getRequest(
            '/project/page/0',
            res => {
                const { data: projects, count } = res.data
                this.setState({
                    pages: count / 20,
                    projects,
                    count
                });
            }
        );
    }

    handlerFilter(event) {
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0) {
            getRequest(
                `/project/page/0?filter=${filter}`,
                res => {
                    const { data: projects, count } = res.data
                    this.setState({
                        pages: count / 20,
                        projects,
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
            `/project/page/${pageNumber}?filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const { data: projects, count } = res.data;
                this.setState({
                    pages: count / 20,
                    projects,
                    count
                });
            }
        );
    }

    render(){
        const { projects, filter, count, pages } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Projetos</h3>
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
                                    <th>Início</th>
                                    <th>Fim</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    projects.length ?
                                        projects.map(project => <ListItem key={project.codProject} project={project} afterDelete={this.componentWillMount} />):
                                        <tr>
                                            <td colSpan="4">
                                                <strong>Não há Projetos registrados</strong>
                                            </td>
                                        </tr>
                                }
                            </tbody>
                        </Table>
                        <Pagination pages={pages} count={count} onChangePage={this.onChangePage.bind(this)} />
                    </Col>
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount.bind(this)} />
                    </Col>
                </Row>
            </Fragment>
        )
    }
} 