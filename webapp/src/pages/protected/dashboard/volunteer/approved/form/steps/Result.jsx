import React, { Component } from 'react';
import { getRequest } from '../../../../../../../utils/http';
import { Row, Col } from 'reactstrap';
import { Switch } from '../../../../../../../components';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            skills: []
        }
    }

    componentWillMount(){
        getRequest('/skill', res => this.setState({ skills: res.data}));
    }

    handleSkills(value, newSkill){
        let { evaluate, update } = this.props;
        if(value){
            evaluate.skills.push(newSkill);
        } else {
            const { skills } = evaluate;
            evaluate.skills = skills.filter(skill => skill.codSkill !== newSkill.codSkill);
        }
        update(evaluate);
        
    }

    render(){
        const { skills } = this.state;
        return (
            <div>
                <h3>Resultados da mentoria</h3>
                <p>
                    Quais dessas competências você melhorou como um resultado direto da sua participação <br/>
                    como Mentor na Computação na Escola? (marque todas as alternativas desejadas)
                </p>
                <Row>
                    {
                        skills.map(
                            skill => (
                                <Col md="3" key={`skills-${skill.codSkill}`}>
                                    <Switch id={`skills-${skill.codSkill}`} label={skill.name} onChange={value => this.handleSkills(value, skill)}/>
                                </Col>
                            )
                        )
                    }
                </Row>
                <hr className="row"/>
            </div>
        );
    }
}