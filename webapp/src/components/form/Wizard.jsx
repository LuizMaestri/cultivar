import React from 'react';
import PropTypes from 'prop-types';
import { WithWizard, Wizard, Steps, Step } from "react-albus";
import { Button, Form, Row, Col } from 'reactstrap';

const Navigation = props => (
    <WithWizard
        render={({ next, previous, step, steps }) => (
            <Row>
                {
                    steps.indexOf(step) === 0 && (
                        <Col>
                            <Button color="danger" onClick={props.onBackClick}>
                                Cancelar
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) > 0 && (
                        <Col>
                            <Button color="secondary" onClick={previous}>
                                Voltar
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) < steps.length - 1 && (
                        <Col>
                            <Button id="next" type="button" color="primary" className="float-right" onClick={()=>{
                                    props.onNext && props.onNext(step) &&  next();
                                }}>
                                Próximo
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) === steps.length - 1 && (
                        <Col>
                            <Button id="next" type="button" color="primary" className="float-right" onClick={this.props.onSubmit}>
                                {props.submitTitle}
                            </Button>
                        </Col>
                    )
                }
            </Row>
        )}
    />
);

const WizardForm = props => {
    return (
            <Form>
                <Wizard>
                    <Steps>
                        { 
                            React.Children.map(props.children, (child, index) => (
                                <Step id={'step-' + index}>
                                    {child}
                                </Step>
                            ))
                        }
                    </Steps>
                    <Navigation { ...props }/>
                </Wizard>
            </Form>
    );
}


WizardForm.propTypes = {
    onSubmit : PropTypes.func.isRequired,
    onBackClick: PropTypes.func.isRequired,
    submitTitle: PropTypes.string.isRequired,
    onNext: PropTypes.func
}

export default WizardForm;