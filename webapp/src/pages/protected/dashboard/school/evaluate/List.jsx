import React, { Component, Fragment } from 'react';
import Evaluate from './Evaluate';
import { getRequest } from '../../../../../utils/http';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            evaluates: []
        };
    }

    componentWillMount(){
        const { codSchool } = this.props;
        getRequest(
            `/school/${codSchool}/evaluate`,
            res => this.setState({
                evaluates: res.data.map(
                    event => {
                        event.end = new Date(event.endOccurrence);
                        event.start = new Date(event.startOccurrence);
                        event.title = event.type.name + ' - ' + event.start.toLocaleString()
                        return event
                    }
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