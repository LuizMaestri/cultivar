import React, { Component } from 'react';
import Input from '../input';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

export default class extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        mask: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        invalidMessage: requiredIf(PropTypes.string, props => props.required),
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        maskChar: PropTypes.string,
        onChange: PropTypes.func
    }

    static defaultProps = {
        maskChar: '_',
    }

    componentDidMount() {
        const { id, value } = this.props;
        document.getElementById(id).value = value;
    }

    render() {
        const { id, label, placeholder, invalidMessage, onChange, required, mask, maskChar, value, ...rest } = this.props
        return (
            <InputMask onChange={onChange} mask={mask} maskChar={maskChar} >
                {
                    inputProps =>
                        (
                            <Input id={id} {...inputProps} label={label} invalidMessage={invalidMessage} placeholder={placeholder} required={required} {...rest} />
                        )
                }
            </InputMask>
        );
    }
}