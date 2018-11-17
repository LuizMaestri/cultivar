import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';
import { Row, Col } from 'reactstrap';
import { Input, Switch } from '../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            presence: false
        };
    }

    

    render(){
        const { participant, onRatingSelect, rating, onComment, presence, onPresenceChange } = this.props;
        return (
            <div>
                <h3>{participant.name}</h3>
                <Row>
                    <Col>
                        <Switch id={`participant-${participant.cpf}`} label="Esteve presente" onChange={onPresenceChange} />
                    </Col>
                </Row>
                <Row style={{ fontSize: 110 }}>
                    <Col>
                        <StarRatingComponent
                            name="rate1"
                            starCount={5}
                            value={rating.grade/20}
                            onStarClick={onRatingSelect}
                            editing={presence}
                        />
                    </Col>
                </Row>
                <Input id="comment" label="Feedback sobre o Voluntário" type="textarea" value={rating.comment} onChange={onComment} disabled={!presence}/>                
                <hr className="row" />
            </div>
        );
    }
}