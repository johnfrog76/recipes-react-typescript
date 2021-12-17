import React, { FC } from 'react';

import { useField } from 'formik';
import FieldWrapper from '../field-wrapper/field-wrapper.component';
import { StyledFieldWrapper, StyledCheckBox, StyledLabel, CheckBoxIcon } from './checkbox-field.styles';

interface Props {
    name: string;
    required?: boolean;
    label?: string;
    id: string;
}

const CheckBoxField: FC<Props> = ({ required = false, label, name, id }) => {
    const [field, meta] = useField({ name, id, type: 'checkbox' });
    return (
        <StyledFieldWrapper>
            {
                label && (<StyledLabel Required={required} htmlFor={id}>{label}</StyledLabel>)
            }
            <label htmlFor={id}>
                <CheckBoxIcon ison={field.value ? 'yes' : 'no'} />
            </label>
            <StyledCheckBox
                type="checkbox"
                required={required}
                id={id}
                {...field}
            />
        </StyledFieldWrapper>
    )
}

export default CheckBoxField;