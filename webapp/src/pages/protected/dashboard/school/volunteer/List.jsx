import React, { Component, Fragment } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import VolunteerItem from './ListItem.jsx';
import { Pagination, Filter } from '../../../../../components';

export default class extends Component {
    constructor() {
        super()
        this.state = {
            filter: '',
            users: [],
            count: 0,
            pages: 0
        }
        this.onChangePage = this.onChangePage.bind(this);
        this.handlerFilter = this.handlerFilter.bind(this);
    }

    componentWillMount() {
        const { codSchool } = this.props;
        const { filter } = this.state;
        getRequest(
            `/volunteer/page/0?cod_school=${codSchool}&filter=${filter}`,
            res => {
                const page = res.data;
                this.setState({
                    users: page.data.map(volunteer => volunteer.user),
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }

    componentWillReceiveProps() {
        this.componentWillMount();
    }

    handlerFilter(event) {
        const { codSchool } = this.props;
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0) {
            getRequest(
                `/volunteer/page/0?&cod_school=${codSchool}&filter=${filter}`,
                res => {
                    const page = res.data;
                    this.setState({
                        users: page.data.map(volunteer => volunteer.user),
                        count: page.count,
                        pages: page.count / 5,
                        filter
                    });
                }
            );
        } else {
            this.setState({ filter });
        }
    }

    onChangePage(pageNumber) {
        const { codSchool } = this.props;
        const { filter } = this.state;
        getRequest(
            `/volunteer/page/${pageNumber}?cod_school=${codSchool}&filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const page = res.data;
                this.setState({
                    users: page.data.map(volunteer => volunteer.user),
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }
    render() {
        const { users, pages, count, filter } = this.state;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Mentores Voluntários</h3>
                    </Col>
                </Row>
                <Filter handlerFilter={this.handlerFilter} value={filter} />
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                users.length ?
                                    users.map(
                                        user => (
                                            <VolunteerItem key={user.cpf} user={user} />
                                        )
                                    ) : (
                                        <ListGroupItem>
                                            <strong>
                                                Nenhum Voluntário Cadastrado
                                            </strong>
                                        </ListGroupItem>
                                    )
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <Pagination pages={pages} count={count} onChangePage={this.onChangePage} />
            </Fragment>
        );
    }
}