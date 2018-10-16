import React, { Component } from 'react';
import { getRequest } from '../../../../../utils/http';
import { Row, Col, ListGroup, ListGroupItem, Form } from 'reactstrap';
import { Pagination, Filter } from '../../../../../components';
import CompanyItem from './ListItem.jsx';
import Add from './Add.jsx';

export default class extends Component {
    constructor() {
        super()
        this.state = {
            filter: '',
            companies: [],
            count: 0,
            pages: 0
        }
        this.onChangePage = this.onChangePage.bind(this);
        this.handlerFilter = this.handlerFilter.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this)
    }

    componentWillMount() {
        getRequest(
            '/company/page/0',
            res => {
                const page = res.data;
                this.setState({
                    companies: page.data,
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }

    handlerFilter(event) {
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0){
            getRequest(
                `/company/page/0?filter=${filter}`,
                res => {
                    const page = res.data;
                    this.setState({
                        companies: page.data,
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
        const { filter } = this.state;
        getRequest(
        `/company/page/${pageNumber}?filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const page = res.data;
                this.setState({
                    companies: page.data,
                    count: page.count,
                    pages: page.count / 5
                });
            }
        );
    }

    render() {
        const { companies, pages, count  } = this.state;
        const { onSelectCompany } = this.props;
        return (
            <div>
                <Row>
                    <Col>
                        <h3>
                            Empresas Envolvidas
                        </h3>
                    </Col>
                    <Col md="2">
                        <Add afterSubmit={this.componentWillMount}/>
                    </Col>
                </Row>
                <Filter handlerFilter={this.handlerFilter}/>
                <Row>
                    <Col>
                        <ListGroup>
                            {
                                companies.length ? 
                                    companies.map(
                                        company => 
                                            <CompanyItem onSelectCompany={onSelectCompany} key={company.cnpj} company={company} afterDelete={this.componentWillMount}/>
                                    ) : (
                                        <ListGroupItem>
                                            <strong>
                                                Nenhuma Empresa Cadastrada
                                            </strong>
                                        </ListGroupItem>
                                    )
                            }
                        </ListGroup>
                    </Col>
                </Row>
                <Pagination pages={pages} count={count} onChangePage={this.onChangePage} />
            </div>
        );
    }
}