import React, { Component, Fragment } from 'react';
import Evaluate from './Evaluate';
import { getRequest } from '../../../../../utils/http';
import axios from 'axios';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            evaluates: []
        };
    }

    componentWillMount(){
        const { codSchool } = this.props;
        axios.all([
            getRequest(`/school/${codSchool}/event/evaluate`, res => res.data),
            getRequest(`/school/${codSchool}/project/evaluate`, res => res.data),
        ]).then(
            res => this.setState({
                evaluates: res[0].map(
                    event => {
                        event.end = new Date(event.endOccurrence);
                        event.start = new Date(event.startOccurrence);
                        event.title = event.type.name + ' - ' + event.start.toLocaleString()
                        event.isProject = false;
                        return event
                    }
                ).concat(
                    res[1].map(
                        project => {
                            project.isProject = true;
                            project.title = project.name
                            return project;
                        }
                    )
                )
            })
        );
    }

    render(){
        const { evaluates } = this.state;
        const { codSchool } = this.props;
        return (
            <Fragment>
                <h3 className="text-center">Avaliações</h3>
                <br />
                {
                    evaluates.length ?
                        evaluates.map(
                            evaluate => <Evaluate evaluate={evaluate} codSchool={codSchool} afterSubmit={this.componentWillMount.bind(this)}/>
                        ) : null
                }
            </Fragment>
        )
    }
}