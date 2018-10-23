import React, { Component } from 'react';
import { Difficulty, Enjoy, Expectation } from '../../../../../../../model';
import { Row, Col } from 'reactstrap';
import { Input, Radio } from '../../../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.handlerExperience = this.handlerExperience.bind(this);
        this.onCheckDifficulty = this.onCheckDifficulty.bind(this);
        this.onCheckFlEnjoy = this.onCheckFlEnjoy.bind(this);
        this.handlerEnjoy = this.handlerEnjoy.bind(this);
        this.handlerNotEnjoy = this.handlerNotEnjoy.bind(this);
        this.onCheckExpectation = this.onCheckExpectation.bind(this);
    }

    handlerExperience(event){
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.experience = event.target.value;
        update(evaluate);
    }

    onCheckFlEnjoy(event) {
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.flEnjoy = event.target.value;
        update(evaluate);
    }

    handlerEnjoy(event){
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.enjoy = event.target.value;
        update(evaluate);
    }

    handlerNotEnjoy(event){
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.notEnjoy = event.target.value;
        update(evaluate);
    }

    onCheckDifficulty(event){
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.difficulty = event.target.value;
        update(evaluate);
    }

    onCheckExpectation(event){
        const { evaluate, update } = this.props;
        const { experience } = evaluate;
        experience.expectation = event.target.value;
        update(evaluate);
    }

    render(){
        const { experience, title } = this.props.evaluate;
        const {
            experience: ex,
            difficulty,
            expectation,
            flEnjoy,
            enjoy,
            notEnjoy,
            suggest
        } = experience
        return (
            <div>
                <h3>Você acabou de participar de {title}</h3>
                <Input id="experience" label="O que você achou desta experiência?" type="textarea" value={ex} onChange={this.handlerExperience}/>
                <br />
                <Row>
                    <Col />
                    {
                        Difficulty.values()
                            .map(
                                diff => (
                                    <Col md= "2">
                                        <strong>
                                            {Difficulty.translate(diff)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                <Row>
                    <Col>
                        Essa experiência de mentoria foi:
                    </Col>
                    {
                        Difficulty.values()
                            .map(
                                diff => (
                                    <Col key={diff} md="2" style={{ paddingTop: '15px' }}>
                                        <Radio value={diff} name={`difficulty-${diff}`} checked={difficulty === diff} onChange={this.onCheckDifficulty} />
                                    </Col>
                                )
                            )
                    }
                </Row>
                <br/>
                <Row>
                    <Col />
                    {
                        Enjoy.values()
                            .map(
                                enjoy => (
                                    <Col md= "2">
                                        <strong>
                                            {Enjoy.translate(enjoy)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                <Row>
                    <Col>
                        Essa experiência de mentoria foi:
                    </Col>
                    {
                        Enjoy.values()
                            .map(
                                joy => (
                                    <Col key={joy} md="2" style={{ paddingTop: '15px' }}>
                                        <Radio value={joy} name={`enjoy-${joy}`} checked={flEnjoy === joy} onChange={this.onCheckFlEnjoy} />
                                    </Col>
                                )
                            )
                    }
                </Row>
                <br/>
                <Row>
                    <Col />
                    {
                        Expectation.values()
                            .map(
                                expec => (
                                    <Col md= "2">
                                        <strong>
                                            {Expectation.translate(expec)}
                                        </strong>
                                    </Col>
                                )
                            )
                    }
                </Row>
                <Row>
                    <Col>
                        Você acha que essa experiência satisfez as suas expectativas?
                    </Col>
                    {
                        Expectation.values()
                            .map(
                                expec => (
                                    <Col key={expec} md="2" style={{ paddingTop: '15px' }}>
                                        <Radio value={expec} name={`expectation-${expec}`} checked={expectation === expec} onChange={this.onCheckExpectation} />
                                    </Col>
                                )
                            )
                    }
                </Row>
                <br/>
                <Input id="enjoy" label="O que mais gostei nessa experiência de mentoria foi:" type="textarea" value={enjoy} onChange={this.handlerEnjoy} />
                <Input id="notEnjoy" label="O que menos gostei nessa experiência de mentoria foi:" type="textarea" value={notEnjoy} onChange={this.handlerNotEnjoy} />
                <Input id="experience" label="Que tipo de suporte/apoio/material a iniciativa Computação na Escola poderia fornecer para apoiar as suas atividades como Mentor?"
                    type="textarea" value={suggest} onChange={this.handlerSuggest} />
                <hr className="row"/>
            </div>
        );
    }
}