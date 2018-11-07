import React, { Component } from 'react';
import { Row, Col, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { School, Company } from './documents';
import { Roles } from '../../../model';
import { getRequest } from '../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            data: null,
            show: {
                school: false,
                company: false
            }
        }
    }

    componentWillMount(){
        getRequest('/report', res => this.setState({ data: res.data }));
    }

    changeReport(report){
        const { show } = this.state;
        show.school = false
        show.company = false
        show[report] = true;
        this.setState({show});
    }

    render(){
        const { role, logged } = this.props;
        const { data, show } = this.state;
        if (role === Roles.ADMIN) {
            if(data){
                return (
                    <Row>
                        <Col md="1" />
                        <Col>
                            <Row>
                                <Col>
                                    <Button color="primary" onClick={() => this.changeReport('school')}>Relatório por Escola</Button>
                                </Col>
                                <Col>
                                    <Button color="primary" onClick={() => this.changeReport('company')}>Relátório por Empresa</Button>
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    {show.company && <Company data={data} />}
                                    {show.school && <School data={data} />}
                                </Col>
                            </Row>
                            
                        </Col>
                        <Col md="1" />
                    </Row>
                );
            } else {
                return null;
            }
        }
        return <Redirect to="/" />
    }
}
