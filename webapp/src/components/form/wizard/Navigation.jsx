import React from 'react';
import PropTypes from 'prop-types';
import { WithWizard } from "react-albus/lib";
import { Button, Row, Col } from 'reactstrap';

const Navigation = ({ onCancel, validate, onSubmit, submitLabel, nextLabel, previousLabel, cancelLabel}) => (
    <WithWizard
        render={({ next, previous, step, steps }) => (
            <Row>
                {
                    steps.indexOf(step) === 0 && (
                        <Col>
                            <Button color="danger" onClick={onCancel}>
                                {cancelLabel}
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) > 0 && (
                        <Col>
                            <Button color="secondary" onClick={previous}>
                                {previousLabel}
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) < steps.length - 1 && (
                        <Col>
                            <Button id="next" type="button" color="primary" className="float-right" onClick={() => {
                                validate && validate(step);
                                next();
                            }}>
                                {nextLabel}
                            </Button>
                        </Col>
                    )
                }
                {
                    steps.indexOf(step) === steps.length - 1 && (
                        <Col>
                            <Button id="next" type="button" color="primary" className="float-right" onClick={onSubmit}>
                                {submitLabel}
                            </Button>
                        </Col>
                    )
                }
            </Row>
        )}
    />
);

Navigation.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    submitLabel : PropTypes.string.isRequired,
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

export default Navigation;