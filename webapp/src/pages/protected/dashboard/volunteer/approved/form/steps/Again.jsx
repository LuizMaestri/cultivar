import React, { Component } from 'react';
import { getRequest } from '../../../../../../../utils/http';
import { Row, Col } from 'reactstrap';
import { Switch, Input } from '../../../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            activities: []
        }
    }

    componentWillMount() {
        getRequest('/skill', res => this.setState({ activities: res.data }));
    }

    handlerInterest(value){
        const { evaluate, update } = this.props;
        evaluate.again.interest = value;
        update(evaluate);
    }

    handlerComment(event) {
        const { evaluate, update } = this.props;
        evaluate.again.comment = event.target.value;
        update(evaluate);
    }

    handleActivities(value, newActivity) {
        const { evaluate, update } = this.props;
        let { again } = evaluate;
        if (value) {
            again.activities.push(newActivity);
        } else {
            const { activities } = again;
            again.activities = activities.filter(activity => activity.codActivity !== newActivity.codActivity);
        }
        update(evaluate);

    }

    render() {
        const { activities } = this.state;
        const { comment } = this.props.evaluate.again;
        return (
            <div>
                <h3>Continuação das atividades</h3>
                <Row>
                    <Col>
                        <Switch id="interest" label="Você tem interesse em atuar novamente como mentor na iniciativa Computação na Escola?&nbsp;&nbsp;" onChange={this.handlerInterest} />
                    </Col>
                </Row>
                <br/>
                <p>
                    Você tem interesse em ajudar em alguma outra atividade da Computação na Escola?
                </p>
                <Row>
                    {
                        activities.map(
                            activity => (
                                <Col md="3" key={`activity-${activity.codActivity}`}>
                                    <Switch id={`activity-${activity.codActivity}`} label={activity.name} onChange={value => this.handleActivities(value, activity)} />
                                </Col>
                            )
                        )
                    }
                </Row>
                <br/>
                <Input id="comment" label="Mais algum comentário?" type="textarea" value={comment} onChange={this.handlerComment} />
                <hr className="row" />
            </div>
        );
    }
}