import React from 'react';
import Input from '../input';
import InputMask from 'react-input-mask';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';

const Mask = ({ id, label, placeholder, invalidMessage, onChange, required, mask, maskChar, ...rest }) => (
    <InputMask  onChange={onChange} mask={mask} maskChar={maskChar} >
        {
            inputProps => 
                (
                    <Input id={id} {...inputProps} label={label} invalidMessage={invalidMessage} placeholder={placeholder} required={required} {...rest} />
                )
        }
    </InputMask>
);

Mask.propTypes = {
    id : PropTypes.string.isRequired,
    mask: PropTypes.string.isRequired,
    label : PropTypes.string.isRequired,
    invalidMessage: requiredIf(PropTypes.string, props => props.required),
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    maskChar: PropTypes.string,
    onChange: PropTypes.func
};

Mask.defaultProps = {
    maskChar: '_',
};

export default Mask;