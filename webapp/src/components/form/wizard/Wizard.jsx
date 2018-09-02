import React from 'react';
import PropTypes from 'prop-types';
import { Wizard, Steps, Step } from "react-albus/lib";
import { Form } from 'reactstrap';
import Navigation from './Navigation';

const WizardForm = ({ children, onCancel, validate, onSubmit, submitLabel, nextLabel, previousLabel, cancelLabel}) => {
    return (
            <Form>
                <Wizard>
                    <Steps>
                        { 
                            React.Children.map(children, (child, index) => (
                                <Step id={'step-' + index}>
                                    {child}
                                </Step>
                            ))
                        }
                    </Steps>
                <Navigation {...{ onCancel, validate, onSubmit, submitLabel, nextLabel, previousLabel, cancelLabel}}/>
                </Wizard>
            </Form>
    );
}


Navigation.propTypes = {
    children: PropTypes.element,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitLabel: PropTypes.string.isRequired,
    validate: PropTypes.func,
    nextLabel: PropTypes.string,
    previousLabel: PropTypes.string,
    cancelLabel: PropTypes.string
};

Navigation.defaultProps = {
    validate: () => null,
    nextLabel: 'Avançar',
    previousLabel: 'Voltar',
    cancelLabel: 'Cancelar'
};

export default WizardForm;