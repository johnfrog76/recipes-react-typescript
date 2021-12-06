import React from 'react';
import { useField } from 'formik';

import { StyledInput, StyledLabel } from './text-field.styles';
import FieldWrapper from '../../atoms/field-wrapper/field-wrapper.component';
import { Password } from '@mui/icons-material';

interface iTextField {
    name: string;
    id: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    type?: 'text' | 'password'
}


const RecipeTextField = ({ name, id, placeholder, type = "text", required = false, label }: iTextField) => {

    const [field, meta] = useField({ name, id });
    return (
        <FieldWrapper>

            {label && (<StyledLabel Required={required} htmlFor={id}>{label}</StyledLabel>)}
            <StyledInput
                id={id}
                placeholder={placeholder}
                required={required}
                {...field}
                type={type}
            />
        </FieldWrapper>
    );
}

export default RecipeTextField;