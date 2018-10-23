import React, { Component,Fragment } from 'react';
import { AnswerAgree } from '../../../../../../../model';
import { Row, Col } from 'reactstrap';
import { Radio } from '../../../../../../../components';

export default class extends Component {
    checkPersonality(at, index) {
        const { answerPersonalities } = this.props.evaluate;
        const { answer } = answerPersonalities[index]
        return answer === at;
    }

    onCheckPersonality(at, index) {
        const { evaluate, update } = this.props;
        const { answerPersonalities } = evaluate;
        answerPersonalities[index].answer = at;
        update(evaluate);
    }

    render(){
        const { personalityQuestions } = this.props;
        return (
            <div>
                <h3>Sobre você mesmo</h3>
                <br/>
                <Row>
                    <Col />
                    {
                        AnswerAgree.values()
                            .map(
                                pe => (
                                    <Col>
                                        <strong>
                                            {AnswerAgree.translate(pe)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                {
                    personalityQuestions.length ?
                        personalityQuestions.map(
                            (personalityQuestion, index) => (
                                <Fragment>
                                    <Row key={`personality-${personalityQuestion.codQuestion}`}>
                                        <Col>{personalityQuestion.question}</Col>
                                        {
                                            AnswerAgree.values()
                                            .map(
                                                    pe => (
                                                        <Col key={pe} style={{ paddingTop: '15px' }}>
                                                            <Radio value={pe} name={`personality-${personalityQuestion.codQuestion}`} checked={this.checkPersonality(pe, index)} onChange={() => this.onCheckPersonality(pe, index)} />
                                                        </Col>
                                                    )
                                                )
                                            }
                                    </Row>
                                    {index !== personalityQuestions.length-1 ? <hr/>: null}
                                </Fragment>
                            )
                        ) : null
                }
                <hr className="row"/>
            </div>
        );
    }
}