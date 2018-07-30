import React, { Component } from 'react';
import { Row, Col, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import VolunteerItem from '../components/volunteer';
import axios from 'axios';

const request = 
    url => axios
        .get(url)
        .then(res => res.data)
        .catch(() => []);

const createState = 
    (schools, companies, volunteers) => {
        return { 
            schools,
            companies,
            volunteers
        };
    };

const listTitles = {
    schools: 'Escolas Benificiadas',
    companies: 'Empresas Envolvidas',
    volunteers: 'Mentores Voluntários'
};

const getTag = (key, element) => {
    return {
        schools: (null),
        companies: (null),
        volunteers: (<VolunteerItem volunteer={element} key={element.id}/>)
    }[key]
};

export default class AdminDashboard extends Component{
    constructor(){
        super()
        this.state = createState([], [], []);
    }

    componentWillMount(){
        axios
            .all([request('/volunteer'), request('/place/company'), request('/place/school')])
            .then((res) => this.setState(createState(...res)));
    }

    render(){
        const { state } = this;
        state.volunteers.push({
            id: '05002013902',
            name: 'luiz',
            grade: 100
        })
        let lists = [];
        for (const key in state) {
            if (state.hasOwnProperty(key)) {
                const elements = state[key];
                let list = elements ? elements.map(
                    (element, index) => index < 5 ? getTag(key, element) : null
                ) : null;
                lists.push((
                    <Col md="3 offset-1" key={ key }>
                        <CardTitle>{ listTitles[key] }</CardTitle>
                        <ListGroup>
                            { list }
                            <ListGroupItem action>Mais...</ListGroupItem>
                        </ListGroup>
                    </Col>
                ));
            }
        }
        return (
            <div>
                <Row></Row>
                <Row>
                    {lists}
                </Row>
                <Row></Row>
            </div>
        );
    }
}