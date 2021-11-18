import React from 'react';
import { useField } from 'formik';

import { StyledInput, StyledLabel } from './text-field.styles';
import FieldWrapper from '../../atoms/field-wrapper/field-wrapper.component';

interface iTextField {
    name: string;
    id: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
}


const RecipeTextField = ({ name, id, placeholder, required = false, label }: iTextField) => {

    const [field, meta] = useField({ name, id });
    return (
        <FieldWrapper>

            {label && (<StyledLabel htmlFor={id}>{label}</StyledLabel>)}
            <StyledInput
                id={id}
                placeholder={placeholder}
                required={required}
                {...field}
            />
        </FieldWrapper>
    );
}

export default RecipeTextField;