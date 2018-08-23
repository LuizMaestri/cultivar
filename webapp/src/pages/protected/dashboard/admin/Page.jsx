import React, { Component } from 'react';
import { Row, Col, CardTitle, ListGroup, ListGroupItem } from 'reactstrap';
import VolunteerItem from '../components/volunteer';
import PlaceItem from '../components/place';
import { Link } from 'react-router-dom';
import { getRequest } from '../../../../utils/http';
import axios from 'axios';

const request = url => getRequest(url, res => res.data, () => [])

const createState = 
    (volunteers, companies, schools) => {
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

const routes = {
    schools: '/escolas',
    companies: '/empresas',
    volunteers: '/voluntarios'
}

const getTag = (key, element) => {
    return {
        schools: (<PlaceItem place={element} key={element.id} />),
        companies: (<PlaceItem place={element} key={element.id} />),
        volunteers: (<VolunteerItem volunteer={element} key={element.id}/>)
    }[key]
};

const pointer = {
    cursor: 'pointer'
};

export default class AdminDashboard extends Component{
    constructor(){
        super()
        this.state = createState([], [], []);
    }

    componentWillMount(){
        axios
            .all([request('/volunteer'), request('/place/company'), request('/place/school')])
            .then(res => this.setState(createState(...res)));
    }

    render(){
        const { state } = this;
        return (
            <div>
                <Row></Row>
                <Row>
                    {
                        ['companies', 'volunteers', 'schools'].map(key => {
                            const elements = state[key];
                            return (
                                <Col md="3 offset-1" key={key}>
                                    <CardTitle>{listTitles[key]}</CardTitle>
                                    <ListGroup style={pointer}>
                                        {
                                            elements ? elements.map(
                                                (element, index) => index < 5 ? getTag(key, element) : null
                                            ) : null
                                        }
                                        <Link className="no-undeline" to={ routes[key] }>
                                            <ListGroupItem tag="button" style={pointer} action>
                                                    Mais...
                                            </ListGroupItem>
                                        </Link>
                                    </ListGroup>
                                </Col>
                            );
                        })
                    }
                </Row>
                <Row></Row>
            </div>
        );
    }
}