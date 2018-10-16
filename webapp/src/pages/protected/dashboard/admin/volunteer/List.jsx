import React, { Component, Fragment } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import VolunteerItem from './ListItem.jsx';
import { Pagination, Filter } from '../../../../../components';

export default class extends Component{
    constructor() {
        super()
        this.state = {
            filter: '',
            volunteers: [],
            count: 0,
            pages: 0
        }
        this.onChangePage = this.onChangePage.bind(this);
        this.handlerFilter = this.handlerFilter.bind(this);
    }

    componentWillMount() {
        const { filterByCompany, filterBySchool } = this.props;
        const { filter } = this.state;
        getRequest(
            `/volunteer/page/0?cod_cnpj=${filterByCompany.join(',')}&cod_school=${filterBySchool.join(',')}&filter=${filter}`,
            res => {
                const page = res.data;
                this.setState({
                    volunteers: page.data,
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }
    
    componentWillReceiveProps(){
        this.componentWillMount();
    }
    
    handlerFilter(event) {
        const { filterByCompany, filterBySchool } = this.props;
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0){
            getRequest(
                `/volunteer/page/0?cod_cnpj=${filterByCompany.join(',')}&cod_school=${filterBySchool.join(',')}&filter=${filter}`,
                res => {
                    const page = res.data;
                    this.setState({
                        volunteers: page.data,
                        count: page.count,
                        pages: page.count / 5,
                        filter
                    });
                }
            );
        } else {
            this.setState({filter});
        }
    }
    
    onChangePage(pageNumber){
        const { filterByCompany, filterBySchool } = this.props;
        const { filter } = this.state;
        getRequest(
            `/volunteer/page/${pageNumber}?cod_cnpj=${filterByCompany.join(',')}&cod_school=${filterBySchool.join(',')}&filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const page = res.data;
                this.setState({
                    volunteers: page.data,
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }
    render(){
        const { volunteers, pages, count } = this.state;
        const { onSelectVolunteer } = this.props;
        return (
            <Fragment>
                <Row>
                    <Col>
                        <h3>Mentores Voluntários</h3>
                    </Col>
                </Row>
                <Filter handlerFilter={this.handlerFilter} />
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                volunteers.length ?
                                    volunteers.map(
                                        volunteer => (
                                            <VolunteerItem key={volunteer.user.cpf} volunteer={volunteer} onSelectVolunteer={onSelectVolunteer} afterDelete={this.componentWillMount.bind(this)}/>
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
                <Pagination pages={pages} count={count} onChangePage={this.onChangePage}/>
            </Fragment>
        );
    }
}