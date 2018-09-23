import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Tooltip } from 'reactstrap';
import training from '../../../../model/training';

export default class extends Component{
    constructor(){
        super();
        this.state = {
            isOpen: false,
            trainings: []
        };
        this.handlerTrainings = this.handlerTrainings.bind(this);
    }

    static propTypes = {
        type: PropTypes.number.isRequired
    }

    handlerTrainings(){
        const { isOpen } = this.state;
        let trainings = [];
        if (!isOpen){
            //TODO 
        }
        this.setState({ isOpen: !isOpen, trainings });
    }

    render(){
        const { isOpen, trainings } = this.state;
        const { type } = this.props;
        return (
            <Fragment>
                <Button id={`type-${type}`} type="button" color="info" onClick={this.handlerTrainings}>Anexos</Button>
                { isOpen && <Tooltip target={`type-${type}`} isOpen={isOpen}>{ trainings.map(training => training.name) }</Tooltip> }
            </Fragment>
        );
    }
}