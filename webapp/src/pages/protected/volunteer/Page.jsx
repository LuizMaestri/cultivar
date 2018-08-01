import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { ListHeader } from '../../../components';

export default class VolunterList extends Component{

    constructor(){
        super();
        this.state = {
            volunteers: []
        }
    }

    componentWillMount(){}

    render(){
        return (
            <div>
                <ListHeader title="Mentores Voluntários" onclick={()=>{}} />
                <Row>
                    <Col>
                        {

                        }
                    </Col>
                </Row>
            </div>
        );
    }
}