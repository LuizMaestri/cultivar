import React, { Component, Fragment } from 'react';
import { AnswerTechnology } from '../../../../../../../model';
import { Row, Col } from 'reactstrap';
import { Radio } from '../../../../../../../components';

export default class extends Component{

    checkTechnology(at, index){
        const { technologies } = this.props.evaluate;
        const { answer } = technologies[index]
        return answer === at;
    }

    onCheckTechnology(at, index){
        const { evaluate, update } = this.props;
        const { technologies } = evaluate;
        technologies[index].answer = at;
        update(evaluate);
    }

    render(){
        const { tecnologyQuestions } = this.props;
        return (
            <div>
                <h3>Como você considera a sua experiência</h3>
                <br/>
                <Row>
                    <Col/>
                    {
                        AnswerTechnology.values()
                            .map(
                                at => (
                                    <Col>
                                        <strong>
                                            {AnswerTechnology.translate(at)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                {
                    tecnologyQuestions.length ?
                        tecnologyQuestions.map(
                            (tecnologyQuestion, index) => (
                                <Fragment>
                                    <Row key={`tecnology-${tecnologyQuestion.codTechnology}`}>
                                        <Col>{tecnologyQuestion.name}</Col>
                                        {
                                            AnswerTechnology.values()
                                                .map(
                                                        at => (
                                                            <Col key={`${at}-${index}`} style={{ paddingTop: '15px' }}>
                                                                <Radio value={at} name={`tecnology-${tecnologyQuestion.codTechnology}`} checked={this.checkTechnology(at, index)} onChange={() => this.onCheckTechnology(at, index)}/>
                                                            </Col>
                                                        )
                                                    )
                                            }
                                    </Row>
                                    {index !== tecnologyQuestions.length-1 ? <hr/>: null}
                                </Fragment>
                            )
                        ) : null
                }
                <br/>
                <hr className="row"/>
            </div>
        )
    }
}