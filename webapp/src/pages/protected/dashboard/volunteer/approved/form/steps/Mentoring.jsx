import React, { Component, Fragment } from 'react';
import { AnswerAgree } from '../../../../../../../model';
import { Row, Col } from 'reactstrap';
import { Radio } from '../../../../../../../components';

export default class extends Component {
    checkMentoring(at, index) {
        const { mentoring } = this.props.evaluate;
        const { answer } = mentoring[index]
        return answer === at;
    }

    onCheckMentoring(at, index) {
        const { evaluate, update } = this.props;
        const { mentoring } = evaluate;
        mentoring[index].answer = at;
        update(evaluate);
    }

    render(){
        const { mentoringQuestions } = this.props;
        return (
            <div>
                <h3>A sua percepção da mentoria</h3>
                <br/>
                <Row>
                    <Col />
                    {
                        AnswerAgree.values()
                            .map(
                                me => (
                                    <Col>
                                        <strong>
                                            {AnswerAgree.translate(me)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                {
                    mentoringQuestions.length ?
                        mentoringQuestions.map(
                            (mentoringQuestion, index) => (
                                <Fragment>
                                    <Row key={`personality-${mentoringQuestion.codQuestion}`}>
                                        <Col>{mentoringQuestion.question}</Col>
                                        {
                                            AnswerAgree.values()
                                            .map(
                                                me => (
                                                        <Col key={me} style={{ paddingTop: '15px' }}>
                                                            <Radio value={me} name={`personality-${mentoringQuestion.codQuestion}`} checked={this.checkMentoring(me, index)} onChange={() => this.onCheckMentoring(me, index)} />
                                                        </Col>
                                                    )
                                                )
                                            }
                                    </Row>
                                    {index !== mentoringQuestions.length-1 ? <hr/>: null}
                                </Fragment>
                            )
                        ) : null
                }
                <hr className="row"/>
            </div>
        );
    }
}