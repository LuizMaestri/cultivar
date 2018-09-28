import React from 'react';
import { Row, Col, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class Example extends React.Component {
    constructor(){
        super();
        this.state = {
            page: 0
        };
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }

    increment(){
        const page = this.state.page + 1;
        this.props.changePage(page);
        this.setState({page});
    }

    decrement() {
        const page = this.state.page - 1;
        this.props.changePage(page);
        this.setState({ page });
    }

    render() {
        const { pages } = this.props;
        const { page } = this.state;
        return (
            <Row>
                <Col />
                <Col>
                    <Pagination aria-label="Page navigation example">
                        <PaginationItem disabled={page === 0}>
                            <PaginationLink previous href="#" onClick={this.decrement}/>
                        </PaginationItem>
                        <PaginationItem disabled={page === parseInt(pages)}>
                            <PaginationLink next href="#"  onClick={this.increment}/>
                        </PaginationItem>
                    </Pagination>
                </Col>
                <Col>
                    <strong>
                        Página {page + 1} de {parseInt(pages) + 1}
                    </strong>
                </Col>
            </Row>
        );
    }
}