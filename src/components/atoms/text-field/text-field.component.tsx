import React from 'react';
import { useField } from 'formik';

import { StyledInput, StyledLabel, StyledVisibility, StyledVisibilityOff, StyledEyeButton, StyledEyeLabel } from './text-field.styles';
import FieldWrapper from '../../atoms/field-wrapper/field-wrapper.component';

interface iTextField {
    name: string;
    id: string;
    placeholder?: string;
    required?: boolean;
    label?: string;
    type?: 'text' | 'password';
    isVisible?: boolean;
    onVisibilityChange?: () => void;
}


const RecipeTextField = ({
    name, id, placeholder, type = "text", required = false, label, onVisibilityChange, isVisible }: iTextField) => {

    const [field, meta] = useField({ name, id });
    return (
        <FieldWrapper>
            {onVisibilityChange && (
                <StyledEyeLabel Required={required} htmlFor={id}>
                    <span>{label}</span>
                    {
                        isVisible ? (
                            <StyledEyeButton
                                type="button"
                                title="hide content"
                                onClick={() => onVisibilityChange()}
                            >
                                <StyledVisibilityOff />
                            </StyledEyeButton>
                        ) : (
                            <StyledEyeButton
                                type="button"
                                title="show content"
                                onClick={() => onVisibilityChange()}
                            >
                                <StyledVisibility />
                            </StyledEyeButton>
                        )
                    }

                </StyledEyeLabel>
            )}
            {!onVisibilityChange && label && (<StyledLabel Required={required} htmlFor={id}>{label}</StyledLabel>)}
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