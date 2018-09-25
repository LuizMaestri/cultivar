import React, { Component } from 'react';
import ListCompany from './company';
import ListVolunteer from './volunteer';
import ListEvent from './event'
import ListSchool from './school';
import { Row, Col } from 'reactstrap';

const Hr = () => (
    <div>
        <br />
        <hr />
        <br />
    </div>
);

export default class extends Component{
    constructor(){
        super();
        this.state = {
            filterByCompany: [],
            filterBySchool: []
        }
        this.onSelectCompany = this.onSelectCompany.bind(this);
        this.onSelectSchool = this.onSelectSchool.bind(this);
    }

    onSelectCompany(event){
        const { filterByCompany } = this.state;
        const { value } = event.target;
        if(filterByCompany.includes(value)){
            filterByCompany.splice(filterByCompany.indexOf(value), 1);
        } else {
            filterByCompany.push(value);
        }
        this.setState({ filterByCompany });
    }

    onSelectSchool(event) {
        const { filterBySchool } = this.state;
        const { value } = event.target;
        if (filterBySchool.includes(value)) {
            filterBySchool.splice(filterBySchool.indexOf(value), 1);
        } else {
            filterBySchool.push(value);
        }
        this.setState({ filterBySchool });
    }

    render(){
        const { filterByCompany, filterBySchool } = this.state;
        return (
            <Row>
                <Col md="1" />
                <Col>
                    <Row>
                        <Col />
                    </Row>
                    <Hr />
                    <Row>
                        <Col>
                            <ListCompany onSelectCompany={this.onSelectCompany}/>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <ListVolunteer filterByCompany={filterByCompany} filterBySchool={filterBySchool}/>
                        </Col>
                        <Col md="1" />
                        <Col>
                            <ListSchool onSelectSchool={this.onSelectSchool} />
                        </Col>
                    </Row>
                    <Hr />
                    <Row>
                        <Col>
                            <ListEvent/>
                        </Col>
                    </Row>
                </Col>
                <Col md="1" />
            </Row>
        );
    }
}