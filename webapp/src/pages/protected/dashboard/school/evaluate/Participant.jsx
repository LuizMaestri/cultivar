import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Row, Col } from 'reactstrap';
import { Input } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {};
    }

    render(){
        const { participant, onRatingSelect, rating, onComment } = this.props;
        console.log(rating);
        return (
            <div>
                <h3>{participant.name}</h3>
                <Row style={{ fontSize: 110 }}>
                    <Col>
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={rating.grade/20}
                            onStarClick={onRatingSelect}
                        />
                    </Col>
                </Row>
                <Input id="comment" label="Feedback sobre o Voluntário" type="textarea" value={rating.comment} onChange={onComment} />                
                <hr className="row" />
            </div>
        );
    }
}