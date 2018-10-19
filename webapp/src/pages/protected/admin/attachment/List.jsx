import React, { Component } from 'react';
import { getRequest } from '../../../../utils/http';
import { Row, Col, Table } from 'reactstrap';
import ListItem from './ListItem.jsx';
import Form from './Form.jsx';
import { Filter, Pagination } from '../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            attachments: [],
            filter: '',
            count: 0,
            pages: 0
        };
    }
    
    componentWillMount(){
        getRequest(
            '/attachment/page/0',
            res => {
                const { data: attachments, count } = res.data
                this.setState({
                    pages: count / 20,
                    attachments,
                    count
                })
            }
        );
    }
    
    handlerFilter(event){
        const filter = event.target.value;
        if (filter.length >= 3 || filter.length === 0){
            getRequest(
                `/attachment/pages/0?filter=${filter}`,
                res => {
                    const { data: attachments, count} = res.data
                    this.setState({ 
                        pages: count/20,
                        attachments,
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
            `/attachment/page/${pageNumber}?filter=${filter.lenght > 3 ? filter : ''}`,
            res => {
                const { data: attachments, count } = res.data;
                this.setState({
                    pages: count / 20,
                    attachments,
                    count
                });
            }
        );
    }

    render(){
        const { attachments, filter, pages, count } = this.state;
        return (
            <div>
                <Filter label={<h3>Anexos&nbsp;&nbsp;&nbsp;&nbsp;</h3>} value={filter} handlerFilter={this.handlerFilter.bind(this)} />
                <br/>
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>Nome</th>
                                    <th>Obrigatório</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    attachments.length ? 
                                        attachments.map(
                                            attachment => (
                                                <ListItem key={attachment.codAttachment} attachment={attachment} afterDelete={this.componentWillMount}/>
                                            )
                                        ) : (
                                            <tr>
                                                <td colSpan="3">
                                                    <strong>
                                                        Nenhum Registro encontrado
                                                    </strong>
                                                </td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </Table>
                        <Pagination pages={pages} count={count} onChangePage={this.onChangePage.bind(this)} />
                    </Col>
                    <Col md="4">
                        <Form afterSubmit={this.componentWillMount.bind(this)}/>
                    </Col>
                </Row>
            </div>
        );
    }

}